//ANGULAR
import { Component, Input, OnInit } from '@angular/core';

//RXJS
import { Observable } from 'rxjs';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';
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
  noRewviewsMessage: string = "";

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    if (this.gameId){
      this.store.dispatch(reviewsActions.loadReviewsByGameId({ id: this.gameId }));
      this.reviews$ = this.store.select(store => store.reviews.game_reviews);
      this.noRewviewsMessage = "Aún no hay ninguna opinión";
    }

    if(this.userId){
      this.store.dispatch(reviewsActions.loadReviewsByUserId({ id: this.userId }));
      this.reviews$ = this.store.select(store => store.reviews.user_reviews);
      this.isOpenGameVisible = true;
      this.noRewviewsMessage = "Aún no has publicado ninguna opinión";
    }


  }



}
