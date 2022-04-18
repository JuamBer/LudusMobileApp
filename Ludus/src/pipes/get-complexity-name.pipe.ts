import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplexitiesService } from 'src/services/complexities.service';

@Pipe({
  name: 'getComplexityName'
})
export class GetComplexityNamePipe implements PipeTransform {

  constructor(
    private complexityService: ComplexitiesService
  ){}

  transform(id: string): Observable<string> {
    return this.complexityService.getComplexityName(id);
  }

}
