import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/models/Game';
import { Gender } from 'src/models/Gender';
import { GameService } from 'src/services/game.service';
import { GenderService } from 'src/services/gender.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/models/User';

@Component({
  selector: 'app-favs-page',
  templateUrl: 'favs.page.html',
  styleUrls: ['favs.page.scss']
})
export class FavsPage implements OnInit, OnDestroy {

  user: User;
  suscriptions: Subscription[] = [];
  ids_favs_games$: Observable<string[]> = this.store.select(store => store.auth.ids_favs_games);

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(){
    let userSuscription: Subscription = this.store.select(store => store.auth.user).subscribe(
      (user) => {
        this.user = user;
      }
    )
    this.suscriptions.push(userSuscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

}
