import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getType(id: string) {
    return this.firestore.collection(environment.db_tables.types).doc(id).valueChanges();
  }

  getTypePromise(id: string) {
    return this.firestore.collection(environment.db_tables.types).doc(id).valueChanges().toPromise();
  }

  getTypeName(id: string): Observable<string> {
    return this.firestore.collection(environment.db_tables.types).doc(id).valueChanges().pipe(map((type:any) => type.name));
  }
}
