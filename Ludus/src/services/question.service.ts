import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/Game';
import { Gender } from 'src/models/Gender';
import { GenderService } from './gender.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private ngFirestore: AngularFirestore,
  ) { }

  getQuestionsByGameId(id: string) {
    return this.ngFirestore.collection<any[]>(
      'questions', (ref) => {
        return ref.where('id_game', '==', id)
      })
      .snapshotChanges()
  }

  reply(id_question: string, id_game: string, id_user:string, text: string){
    this.ngFirestore.collection('questions').add(
      {
        id_game: id_game,
        id_user: id_user,
        id_question: id_question,
        text: text
      }
    )
  }
}
