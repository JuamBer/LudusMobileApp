import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/Game';
import { Review } from 'src/models/Review';
import { User } from 'src/models/User';
import { doc, query, collection, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private ngFirestore: AngularFirestore,
  ) { }

  create(id_game: string, id_user:string, rating: number, text: string){
    this.ngFirestore.collection('reviews').add(
      {
        rating: rating,
        text: text,
        id_game: id_game,
        id_user: id_user,
      }
    )
  }

  getReviewsByGameId(id: string) {
    return this.ngFirestore.collection<Review[]>(
      'reviews', (ref) => {
        return ref.where('id_game', '==', id)
      })
      .snapshotChanges()
  }
}
