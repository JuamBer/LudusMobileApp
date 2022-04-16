import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { ReviewService } from 'src/services/review.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { Review } from 'src/models/Review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {

  @Input() gameId: string;
  @Input() userId: string;
  reviews$: Observable<Review[]>;
  isOpenGameVisible: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    if (this.gameId){
      this.store.dispatch(reviewsActions.loadReviewsByGameId({ id: this.gameId }));
      this.reviews$ = this.store.select(store => store.reviews.game_reviews);
    }

    if(this.userId){
      this.store.dispatch(reviewsActions.loadReviewsByUserId({ id: this.userId }));
      this.reviews$ = this.store.select(store => store.reviews.user_reviews);
      this.isOpenGameVisible = true;
    }


  }



}