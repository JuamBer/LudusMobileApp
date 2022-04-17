import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Type } from 'src/models/Type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getTypes():Observable<any> {
    return this.firestore.collection<Type[]>(environment.db_tables.types).valueChanges({ idField: 'id' });
  }

  getType(id: string) {
    return this.firestore.collection(environment.db_tables.types).doc(id).valueChanges({ idField: 'id' });
  }

  getTypeName(id: string): Observable<string> {
    return this.firestore.collection(environment.db_tables.types).doc(id).valueChanges().pipe(map((type:any) => type.name));
  }
}
