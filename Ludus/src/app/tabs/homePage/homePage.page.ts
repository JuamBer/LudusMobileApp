//ANGULAR
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//RXJS
import { Observable } from 'rxjs';
import { ExploreGames } from 'src/models/ExploreGames.model';

//SERVICES
import { GameService } from 'src/services/game.service';

//MODELS
import { Game } from '../../../models/Game';


@Component({
  selector: 'app-homePage',
  templateUrl: 'homePage.page.html',
  styleUrls: ['homePage.page.scss']
})
export class HomePage {
  exploreGames: ExploreGames = {
    populars_games: [],
    new_games: [],
    patrocinated_game: null,
    naipes_games: [],
    fast_games: [],
    recomendeds_games: []
  };

  resultGames: Game[] | undefined = undefined;


  constructor(
    private router: Router,
    private gameService: GameService,
  ) {}


  ngOnInit(){
    this.gameService.getGames().subscribe((games) => {
      this.exploreGames.populars_games = games.map((game: any) => {
        return {
          id: game.payload.doc.id,
          ...game.payload.doc.data()
        };
      })
    });

    this.gameService.getCartasGames().subscribe((games) => {
      this.exploreGames.naipes_games = games.map((game: any) => {
        return {
          id: game.payload.doc.id,
          ...game.payload.doc.data()
        };
      })
    });

    this.gameService.getShortsGames().subscribe((games) => {
      this.exploreGames.fast_games = games.map((game: any) => {
        return {
          id: game.payload.doc.id,
          ...game.payload.doc.data()
        };
      })
    });

  }

  search(event){
    if (event.length > 0){
      this.resultGames = event;
    }else{
      this.resultGames = undefined;
    }
  }


}
