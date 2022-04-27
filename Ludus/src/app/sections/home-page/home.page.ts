//ANGULAR
import { Component } from '@angular/core';

//RXJS
import { Observable } from 'rxjs';

//MODELS
import { Game } from '../../../models/Game';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';

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
    special_game1$: this.store.select(store => store.games.special_game1),
    special_game2$: this.store.select(store => store.games.special_game2),
  };

  searchResultsGames$: Observable<Game[] | null> = this.store.select(store => store.games.search_results_games);

  constructor(
    private store: Store<AppState>,
  ) {}


  ngOnInit(){
    this.store.dispatch(gamesActions.loadCardGames());
    this.store.dispatch(gamesActions.loadQuickGames());
    this.store.dispatch(gamesActions.loadPopularGames({scrollFilter: {limit:3}}));
    this.store.dispatch(gamesActions.loadSpecialGame1({ id: "4" }));
    this.store.dispatch(gamesActions.loadSpecialGame2({ id: "10" }));
  }
}
