import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/models/Game';
import { GameService } from 'src/services/game.service';

@Pipe({
  name: 'getGame'
})
export class GetGamePipe implements PipeTransform {

  constructor(
    private gameService: GameService
  ){}

  transform(id: string): Observable<Game> {
    return this.gameService.getGame(id);
  }

}
