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

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  exploreGames: any = {
    popular_games$: this.store.select(store => store.games.popular_games),
    card_games$: this.store.select(store => store.games.card_games),
    quick_games$: this.store.select(store => store.games.quick_games),
  };

  searchResultsGames$: Observable<Game[] | null> = this.store.select(store => store.games.search_results_games);

  constructor(
    private store: Store<AppState>,
  ) {}


  ngOnInit(){
    //this.store.dispatch(gamesActions.loadCardGames());
    //this.store.dispatch(gamesActions.loadQuickGames());
    //this.store.dispatch(gamesActions.loadPopularGames());
  }
}
