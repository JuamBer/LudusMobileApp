import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gender } from 'src/models/Gender';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  getGender(id: string) {
    return this.firestore.collection<Gender>(environment.db_tables.genders).doc(id).valueChanges({ idField: 'id' });
  }

  getGenderName(id: string): Observable<string> {
    return this.firestore.collection(environment.db_tables.genders).doc(id).valueChanges().pipe(map((type: any) => type.name));
  }

  getGenders() {
    return this.firestore.collection<Gender[]>(environment.db_tables.genders).valueChanges({ idField: 'id' });
  }
}
