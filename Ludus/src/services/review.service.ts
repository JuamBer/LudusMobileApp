import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/Game';
import { Review } from 'src/models/Review';
import { User } from 'src/models/User';
import { doc, query, collection, where, getDocs } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  async create(review: Review): Promise<any>{
    try {
      const res = await this.firestore.collection(environment.db_tables.reviews).add({...review});
      return res;
    } catch (err) {
      return err;
    }
  }

  async delete(id: string){
    try {
      const res = await this.firestore.collection(environment.db_tables.reviews).doc(id).delete();

      return res;
    } catch (err) {
      return err;
    }
  }

  async update(review: Review) {
    try {
      const res = await this.firestore.collection(environment.db_tables.reviews).doc(review.id).update({...review});

      return res;
    } catch (err) {
      return err;
    }
  }


  getReviewsByGameId(id: string) {
    return this.firestore.collection<Review[]>(
      environment.db_tables.reviews, (ref) => {
        return ref.where('id_game', '==', id)
      })
      .valueChanges({ idField: 'id' })
  }

  getReviewsByUserId(id: string) {
    return this.firestore.collection<Review[]>(
      environment.db_tables.reviews, (ref) => {
        return ref.where('id_user', '==', id)
      })
      .valueChanges({ idField: 'id' })
  }

  getIfIHaveDoneAReview(user_id: string, game_id: string) {
    return this.firestore.collection<Game>(environment.db_tables.reviews, ref => ref.where('id_game', '==', game_id).where('id_user', '==', user_id)).valueChanges().pipe(
      map((res)=>{

        if(res.length > 0){
          return true
        }else {
          return false
        }
      })
    );
  }
}
