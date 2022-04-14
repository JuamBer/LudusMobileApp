import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/Game';
import { Review } from 'src/models/Review';
import { User } from 'src/models/User';
import { doc, query, collection, where, getDocs } from "firebase/firestore";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  create(id_game: string, id_user:string, rating: number, text: string){
    this.firestore.collection(environment.db_tables.reviews).add(
      {
        rating: rating,
        text: text,
        id_game: id_game,
        id_user: id_user,
      }
    )
  }

  getReviewsByGameId(id: string) {
    return this.firestore.collection<Review[]>(
      environment.db_tables.reviews, (ref) => {
        return ref.where('id_game', '==', id)
      })
      .snapshotChanges()
  }
}
