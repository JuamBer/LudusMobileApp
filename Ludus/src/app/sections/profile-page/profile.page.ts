import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Review } from 'src/models/Review';
import { User } from 'src/models/User';


//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy{

  user: User;
  reviews$: Observable<Review[]> = this.store.select(store => store.reviews.user_reviews);
  isSettingsModalOpen: boolean = false;
  isReviewsVisible: boolean = true;
  isQuestionsVisible: boolean = false;
  suscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {

    let userSuscription: Subscription = this.store.select(store => store.auth.user).subscribe(
      (user)=>{
        if(user){
          this.user = user;
          this.store.dispatch(reviewsActions.loadReviewsByUserId({ id: this.user.id }));
        }
      }
    )
    this.suscriptions.push(userSuscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription)=>{
      suscription.unsubscribe();
    })
  }


  toggleFilterModal() {
    this.isSettingsModalOpen = !this.isSettingsModalOpen;
  }

  toggleComments(event: any) {
    switch (event.detail.value) {
      case 'questions':
        this.isQuestionsVisible = true;
        this.isReviewsVisible = false;
        break;
      case 'reviews':
        this.isQuestionsVisible = false;
        this.isReviewsVisible = true;
        break;
    }
  }

}
