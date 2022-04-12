import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/models/Game';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getUser(id: string) {
    return this.firestore.collection<any>('users').doc(id).valueChanges();
  }

  getUserName(id: string): Observable<string> {
    return this.firestore.collection('users').doc(id).valueChanges().pipe(map((user: any) => user.nickname));
  }

}
