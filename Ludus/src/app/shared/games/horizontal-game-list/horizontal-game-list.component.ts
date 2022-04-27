//ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';

//MODELS
import { Game } from 'src/models/Game';

//SWIPER
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-horizontal-game-list',
  templateUrl: './horizontal-game-list.component.html',
  styleUrls: ['./horizontal-game-list.component.scss'],
})
export class HorizontalGameListComponent implements OnInit {

  @Input() title: string;
  @Input() games: Game[] = [];
  swiperConfig: SwiperOptions = {
    initialSlide: 1,
    slidesPerView: 2,
    speed: 400
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }

  loadMore(number: number){

  }

}
