import { Component, OnInit, Input, OnDestroy} from '@angular/core';
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
import * as authActions from 'src/app/state/auth/auth.actions';
import { User } from 'src/models/User';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit,OnDestroy {

  gameId: string;
  game: Game;
  questionsVisible: boolean = false;
  reviewsVisible: boolean = true;
  iHaveDoneAReview: boolean = true;
  user: User;
  favicon: string = "bookmark-outline";
  iHaveThisGameInFavs: boolean = false;
  suscriptions: Subscription[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.gameId = this.activateRoute.snapshot.paramMap.get('id');
    this.store.dispatch(gamesActions.loadGame({ id: this.gameId }));
    console.log(this.gameId);
    let userSubcription = this.store.select(store=> store.auth.user).subscribe(user => this.user = user);
    this.suscriptions.push(userSubcription);
    let gameSubcription = this.store.select(store => store.games.game).subscribe(game => this.game = game);
    this.suscriptions.push(gameSubcription);
    let favsSubcription = this.store.select(store => store.auth.ids_favs_games).subscribe(ids_favs_games => {
      if (ids_favs_games.some(id => id == this.gameId )){
        this.iHaveThisGameInFavs = true;
      }else{
        this.iHaveThisGameInFavs = false;
      }
    });
    this.suscriptions.push(favsSubcription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
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

  toggleGameToFavs(game: Game){
    if (this.iHaveThisGameInFavs){
      this.store.dispatch(authActions.removeGameToFavs({ id_user: this.user.id, game: game }));
      this.favicon = "bookmark-outline";
    }else{
      this.store.dispatch(authActions.addGameToFavs({ id_user: this.user.id, game: game }));
      this.favicon = "bookmark"
    }
  }

  removeGameToFavs(game: Game) {
  }

}
