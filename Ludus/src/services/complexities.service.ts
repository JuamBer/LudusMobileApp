import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Complexity } from 'src/models/Complexity.model';

@Injectable({
  providedIn: 'root'
})
export class ComplexitiesService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getComplexities() {
    return this.firestore.collection<Complexity[]>(environment.db_tables.complexities).valueChanges({ idField: 'id' });
  }

  getComplexityName(id: string): Observable<string> {
    return this.firestore.collection(environment.db_tables.complexities).doc(id).valueChanges({ idField: 'id' }).pipe(map((complexity: any) => complexity.name));
  }
}
