import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from 'src/models/Game';
import { Page, PageFilter } from 'src/models/Page.model';

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
  getPopularGames() {
    return this.firestore.collection<Game[]>(environment.db_tables.games, ref => ref.orderBy('average_rating', 'desc')).valueChanges({ idField: 'id' });
  }
  getGames() {
    return this.firestore.collection<Game[]>(environment.db_tables.games).valueChanges({ idField: 'id' });
  }
  getSearchResultsGames(search: string) {
    return this.firestore.collection<Game[]>(environment.db_tables.games, ref => ref.orderBy('name').startAt(search).endAt(search + '\uf8ff')).valueChanges({ idField: 'id' });
  }

  getGamesPage(pageFilter: PageFilter) {
    return this.firestore.collection<Game[]>(environment.db_tables.games, ref => {
      return ref
        .startAfter(0)
        .limit(10);
    }).valueChanges().pipe(
      map((games)=>{
        let resultPage: Page<Game> = {
          items: games as unknown as Game[],
          items_per_page: pageFilter.items_per_page,
          page: pageFilter.page
        }
        return resultPage
      })
    );
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

}

