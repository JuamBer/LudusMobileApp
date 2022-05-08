import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from 'src/models/Game';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getUser(id: string) {
    return this.firestore.collection<any>(environment.db_tables.users).doc(id).valueChanges({ idField: 'id' });
  }

  getUserName(id: string): Observable<string> {
    return this.firestore.collection(environment.db_tables.users).doc(id).valueChanges().pipe(map((user: any) => user.name));
  }

  getFavsGames(id: string){
    return this.firestore.collection(environment.db_tables.users).doc(id).valueChanges().pipe(map((user: any) => user.favs_games));
  }

  getRole(id: string) {
    return this.firestore.collection(environment.db_tables.users).doc(id).valueChanges().pipe(map((user: any) => user.role));
  }

  async addGame(id_user:string, game: Game) {
    try {
      const res = this.firestore.collection(environment.db_tables.users).doc(id_user).update({ ids_games: arrayUnion(game.id) });
      return res;
    } catch (err) {
      return err;
    }
  }
  async deleteGame(id_user: string, game: Game) {
    try {
      const res = await this.firestore.collection(environment.db_tables.users).doc(id_user).update({ ids_games: arrayRemove(game.id) });

      return res;
    } catch (err) {
      return err;
    }
  }

  async addGameToFavs(id_user: string, game: Game){
    try {
      const res = await this.firestore.collection(environment.db_tables.users).doc(id_user).update({ favs_games: arrayUnion(game.id)});

      return res;
    } catch (err) {
      return err;
    }
  }

  async removeGameToFavs(id_user: string, game: Game) {
    try {
      const res = await this.firestore.collection(environment.db_tables.users).doc(id_user).update({ favs_games: arrayRemove(game.id) });

      return res;
    } catch (err) {
      return err;
    }
  }
}

