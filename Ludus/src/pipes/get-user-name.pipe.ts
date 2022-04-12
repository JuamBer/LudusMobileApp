import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Pipe({
  name: 'getUserName'
})
export class GetUserNamePipe implements PipeTransform {

  constructor(
    private userService: UserService
  ){}

  transform(id: string): Observable<string> {
    return this.userService.getUserName(id);
  }

}
