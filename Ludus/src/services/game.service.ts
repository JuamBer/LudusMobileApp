import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Game } from 'src/models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

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



  insertNewGame(newGame: Game) {
    return this.firestore.collection('games').add(newGame);
  }



  getGame(id: string) {
    return this.firestore.collection<Game>('games').doc(id).valueChanges();
  }




}
