import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from 'src/models/Type.model';
import { TypeService } from 'src/services/type.service';

@Pipe({
  name: 'getTypeName'
})
export class GetTypeNamePipe implements PipeTransform {

  constructor(
    private typeService: TypeService
  ){}

  transform(id: string): Observable<string> {
    return this.typeService.getTypeName(id);
  }

}
