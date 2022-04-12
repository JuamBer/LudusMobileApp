import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gender } from 'src/models/Gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  getGender(id) {
    return this.firestore.collection<Gender>('genders').doc(id).valueChanges();
  }

  getGenderName(id: string): Observable<string> {
    return this.firestore.collection('genders').doc(id).valueChanges().pipe(map((type: any) => type.name));
  }

  getGenders() {
    return this.firestore.collection<Gender[]>('genders').snapshotChanges();
  }
}
