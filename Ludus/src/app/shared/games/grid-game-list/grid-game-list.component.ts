//ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//RXJS
import { Subscription } from 'rxjs';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';

//MODELS
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-grid-game-list',
  templateUrl: './grid-game-list.component.html',
  styleUrls: ['./grid-game-list.component.scss'],
})
export class GridGameListComponent implements OnInit,OnDestroy {

  @Input() title: string;
  @Input() ids_games: string[] = [];
  @Input() type: string;
  isGameSettingsOpen: boolean = false;
  suscriptions: Subscription[]= [];
  user: User;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    let userSubcription = this.store.select(store => store.auth.user).subscribe(user => this.user = user);
    this.suscriptions.push(userSubcription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }

  removeGameToFavs(game: Game){
    this.store.dispatch(authActions.removeGameToFavs({ id_user: this.user.id, game: game }));
  }

  openGameSettings(game: Game){
    this.isGameSettingsOpen = true;
  }

}
