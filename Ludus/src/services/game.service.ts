import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/models/Filter.model';
import { ScrollFilter } from 'src/models/ScrollFilter.model';
import { Game } from 'src/models/Game';
import { Page, PageFilter } from 'src/models/Page.model';
import { Review } from 'src/models/Review';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private firestore: AngularFirestore,
  ) { }


  getCardGames() {
    return this.firestore.collection<Game[]>(environment.db_tables.games, ref => ref.where('id_type', '==', '2')).valueChanges({ idField: 'id' });
  }
  getQuickGames() {
    return this.firestore.collection<Game[]>(environment.db_tables.games, ref => ref.orderBy('min_time')).valueChanges({ idField: 'id' });
  }

  getPopularGames(scrollFilter: ScrollFilter) {
    return this.firestore.collection<Game[]>(environment.db_tables.games, ref => ref.orderBy('average_rating', 'desc').limit(scrollFilter.limit)).valueChanges({ idField: 'id' });
  }

  getGames() {
    return this.firestore.collection<Game[]>(environment.db_tables.games).valueChanges({ idField: 'id' });
  }

  getFilteredResultsGames(filter: Filter) {
    return this.firestore.collection<Game[]>(environment.db_tables.games,
      (ref: any) => {

        if (filter.text != null) {
          ref = ref.orderBy('name').startAt(filter.text).endAt(filter.text + '\uf8ff');
        }

        // LIMITACIÓN FIREBASE:
        // No puede usar tanto in como array-contains-any en la misma consulta.
        //if (filter.types.length > 0){
        // ref = ref.where('id_type', 'in', filter.types)
        //}

        if (filter.genders.length > 0) {
          ref = ref.where('ids_genders', 'array-contains-any', filter.genders)
        }

        if (filter.players != null) {
          const option: string = filter.players.substring(0,1);

          if (option == '+'){
            ref = ref.where('max_players', '>=',8)
          }else{
            const num_players: number = parseInt(option);
            ref = ref.where('max_players', '>=', num_players)
          }
        }

        if (filter.complexity != null) {
          ref = ref.where('id_complexity', '==', filter.complexity)
        }

        //if (filter.time != null) {
        //  const result = filter.time.trim().split(/\s+/);
        //  const option = result[0];
        //
        //  if (option == '+70') {
        //    ref = ref.where('min_time', '<=', 70)
        //  } else {
        //    const time: number = parseInt(option);
        //    ref = ref.where('max_time', '>=', time)
        //  }
        //}


        return ref
      }).valueChanges({ idField: 'id' });
  }

  insertNewGame(newGame: Game) {
    return this.firestore.collection(environment.db_tables.games).add(newGame);
  }



  getGame(id: string) {
    return this.firestore.collection<Game>(environment.db_tables.games).doc(id).valueChanges({ idField: 'id' });
  }

  getGameName(id: string): Observable<string> {
    return this.firestore.collection(environment.db_tables.games).doc(id).valueChanges({ idField: 'id' }).pipe(map((game: any) => game.name));
  }


  async updateAverageRating(game: Game, review: Review, type: "create" | "update" | "delete", oldReview?: Review): Promise<void>{
    try {
      let newNumberOfRating: number = game.number_of_ratings;
      switch (type) {
        case "create":
          newNumberOfRating = newNumberOfRating+1;
          break;
        case "delete":
          newNumberOfRating = newNumberOfRating-1;
          break;
      }
      const newAverageRating: number = this.calculateNewAverageRating(game, review, type, oldReview);

      return await this.firestore.collection(environment.db_tables.games).doc(review.id_game).update({
        average_rating: newAverageRating,
        number_of_ratings: newNumberOfRating,
      });

    } catch (err) {
      console.log(err);

      return err;
    }

  }

  calculateNewAverageRating(game: Game, review: Review, type: "create" | "update" | "delete", oldReview?: Review){
    let res: number = 0;

    switch (type) {
      case "create":
        res = (((game.average_rating * game.number_of_ratings) + review.rating) / (game.number_of_ratings + 1));
        break;
      case "update":
        res = (((game.average_rating * game.number_of_ratings) - oldReview.rating + review.rating ) / (game.number_of_ratings));
        break;
      case "delete":
        res = (((game.average_rating * game.number_of_ratings) - review.rating) / (game.number_of_ratings - 1));
        break;
    }


    console.log(res);

    return res
  }
}

