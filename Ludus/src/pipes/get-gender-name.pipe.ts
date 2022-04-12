import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { GenderService } from 'src/services/gender.service';

@Pipe({
  name: 'getGenderName'
})
export class GetGenderNamePipe implements PipeTransform {

  constructor(
    private genderService:GenderService
  ){}

  transform(id: string): Observable<string> {
    return this.genderService.getGenderName(id);
  }

}
