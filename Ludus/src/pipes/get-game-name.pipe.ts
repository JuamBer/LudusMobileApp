import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/services/game.service';

@Pipe({
  name: 'getGameName'
})
export class GetGameNamePipe implements PipeTransform {

  constructor(
    private gameService: GameService
  ){}

  transform(id: string): Observable<string> {
    return this.gameService.getGameName(id);
  }

}
