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

  user: User;
  placeholder: string = "¡ Deja tu opinión aquí !";
  form: FormGroup = this.formBuilder.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });

  @Input() gameId: string;
  @Input() userId: string;
  reviews$: Observable<Review[]> = this.store.select(store => store.reviews.game_reviews);

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(store => store.auth.user).subscribe(user => this.user = user)

    if (this.gameId){
      this.store.dispatch(reviewsActions.loadReviewsByGameId({ id: this.gameId }));
    }

    if(this.userId){
      this.store.dispatch(reviewsActions.loadReviewsByUserId({ id: this.userId }));
    }


  }

  sendReview(formValue: any){
    const review: Review = {
      text: formValue.review,
      rating: formValue.rating,
      id_user: this.user.id,
      id_game: this.gameId
    }
    this.store.dispatch(reviewsActions.createReview({ review: review }))
  }

}
