import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/models/Game';
import { Page, PageFilter } from 'src/models/Page.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _data: BehaviorSubject<Game[]>;
  public data: Observable<Game[]>;
  latestEntry: any;

  constructor(
    private firestore: AngularFirestore,
  ) { }


  getCardGames() {
    return this.firestore.collection<Game[]>('games', ref => ref.where('id_type', '==', '2')).valueChanges();
  }
  getQuickGames() {
    return this.firestore.collection<Game[]>('games', ref => ref.orderBy('min_time')).valueChanges();
  }
  getPopularGames() {
    return this.firestore.collection<Game[]>('games', ref => ref.orderBy('average_rating', 'desc')).valueChanges();
  }
  getGames() {
    return this.firestore.collection<Game[]>('games').valueChanges();
  }
  getSearchResultsGames(search: string) {
    return this.firestore.collection<Game[]>('games', ref => ref.orderBy('name').startAt(search).endAt(search + '\uf8ff')).valueChanges();
  }

  getGamesPage(pageFilter: PageFilter) {
    return this.firestore.collection<Game[]>('games', ref => {
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
    return this.firestore.collection('games').add(newGame);
  }



  getGame(id: string) {
    return this.firestore.collection<Game>('games').doc(id).valueChanges();
  }

}

