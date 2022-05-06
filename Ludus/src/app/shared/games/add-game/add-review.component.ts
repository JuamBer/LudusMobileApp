//ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//RXJS
import { Subscription } from 'rxjs';

//NGRX
import * as gameActions from 'src/app/state/games/games.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

//MODELS
import { User } from 'src/models/User';
import { Review } from 'src/models/Review';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit, OnDestroy {

  user: User;
  form: FormGroup = this.formBuilder.group({});

  suscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    let userSubscription = this.store.select(store => store.auth.user).subscribe(user => {
      if(user){
        this.user = user;
      }
    });
    this.suscriptions.push(userSubscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  send(formValue: any) {

  }
}
