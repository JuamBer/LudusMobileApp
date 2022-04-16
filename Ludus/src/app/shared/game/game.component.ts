import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/Game';
import { Gender } from 'src/models/Gender';
import { GameService } from 'src/services/game.service';
import { GenderService } from 'src/services/gender.service';
import { ReviewService } from 'src/services/review.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  gameId: string;
  game: Game;
  questionsVisible: boolean = false;
  reviewsVisible: boolean = true;
  iHaveDoneAReview: boolean = true;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.gameId = this.activateRoute.snapshot.paramMap.get('id');
    this.store.dispatch(gamesActions.loadGame({ id: this.gameId}));
    this.store.select(store => store.games.game).subscribe(game=> this.game = game);
  }

  toggleComments(event: any) {
    switch (event.detail.value){
      case 'questions':
        this.questionsVisible = true;
        this.reviewsVisible = false;
        break;
      case 'reviews':
        this.questionsVisible = false;
        this.reviewsVisible = true;
        break;
    }
  }

}
