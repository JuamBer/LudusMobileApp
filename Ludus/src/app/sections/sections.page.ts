//ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

//MODELS
import { User } from 'src/models/User';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sections-page',
  templateUrl: 'sections.page.html',
  styleUrls: ['sections.page.scss']
})
export class SectionsPage implements OnInit, OnDestroy {

  user: User;

  suscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    let userSuscription: Subscription = this.store.select(store => store.auth.user).subscribe(
      (user) => {
        if (user) {
          this.user = user;
        }
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
