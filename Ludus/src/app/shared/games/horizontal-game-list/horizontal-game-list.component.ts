//ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as gamesActions from 'src/app/state/games/games.actions';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';

//MODELS
import { Game } from 'src/models/Game';
import { Page } from 'src/models/Page.model';

//SWIPER
import { SwiperOptions } from 'swiper';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-horizontal-game-list',
  templateUrl: './horizontal-game-list.component.html',
  styleUrls: ['./horizontal-game-list.component.scss'],
})
export class HorizontalGameListComponent implements OnInit {

  @Input() title: string;
  @Input() games: Page<Game>;
  swiperConfig: SwiperOptions = {
    initialSlide: 1,
    slidesPerView: 2,
    speed: 400
  }

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {}

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }

  loadMore(){
    this.store.dispatch(gamesActions.loadMorePopularGames({page: this.games}));
  }

}
