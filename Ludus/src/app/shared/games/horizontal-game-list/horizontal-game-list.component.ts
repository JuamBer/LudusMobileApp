//ANGULAR
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as gamesActions from 'src/app/state/games/games.actions';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';

//MODELS
import { Game } from 'src/models/Game';
import { Page, PageType } from 'src/models/Page.model';

//SWIPER
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-horizontal-game-list',
  templateUrl: './horizontal-game-list.component.html',
  styleUrls: ['./horizontal-game-list.component.scss'],
})
export class HorizontalGameListComponent implements OnInit {

  @Input() title: string;
  @Input() games: Page<Game>;
  sliderRef: any = document.getElementById("swiper") as unknown;
  swiperConfig: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    speed: 400
  }
  areMoreGames: boolean = true;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }

  loadMore(){
    switch (this.games.type) {
      case PageType.CARD_GAMES:
        this.store.dispatch(gamesActions.loadMoreCardGames({ page: this.games }));
        break;
      case PageType.POPULAR_GAMES:
        this.store.dispatch(gamesActions.loadMorePopularGames({ page: this.games }));
        break;
      case PageType.QUICK_GAMES:
        this.store.dispatch(gamesActions.loadMoreQuickGames({ page: this.games }));
        break;
    }
  }

  onSlideChange(){
    console.log(1);

  }

}
