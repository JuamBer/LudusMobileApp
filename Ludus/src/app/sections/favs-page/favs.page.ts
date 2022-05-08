//ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

//MODELS
import { User } from 'src/models/User';


@Component({
  selector: 'app-favs-page',
  templateUrl: 'favs.page.html',
  styleUrls: ['favs.page.scss']
})
export class FavsPage implements OnInit, OnDestroy {

  user: User;
  suscriptions: Subscription[] = [];
  ids_favs_games$: Observable<string[]> = this.store.select(store => store.auth.user.favs_games);

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
