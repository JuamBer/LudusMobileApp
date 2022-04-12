import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private firestore: AngularFirestore,
  ) { }


  getCartasGames() {
    return this.firestore.collection<Game[]>('games', ref => ref.where('id_type', '==', '2')).snapshotChanges();
  }

  getShortsGames() {
    return this.firestore.collection<Game[]>('games', ref => ref.orderBy('min_time')).snapshotChanges();
  }
  getGames() {
    return this.firestore.collection<Game[]>('games').snapshotChanges();
  }


  insertNewGame(newGame: Game) {
    return this.firestore.collection('games').add(newGame);
  }



  getGame(id: string) {
    return this.firestore.collection<Game>('games').doc(id).valueChanges();
  }

  getGamesBySearch(search:string) {
    return this.firestore.collection<Game[]>('games', ref => ref.orderBy('name').startAt(search).endAt(search + '\uf8ff')).snapshotChanges();
  }


}
