import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/User';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';
import { Review } from 'src/models/Review';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit, OnDestroy {

  @Input() gameId: string;
  iHaveDoneAReview: boolean = true;

  user: User;
  placeholder: string = "¡ Deja tu opinión aquí !";
  form: FormGroup = this.formBuilder.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });
  suscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    let userSubscription = this.store.select(store => store.auth.user).subscribe(user => {
      this.user = user;
      this.store.dispatch(reviewsActions.getIfIHaveDoneAReview({ user_id: this.user.id, game_id: this.gameId}))
    });
    this.suscriptions.push(userSubscription);
    let iHaveDoneAReviewSubscription = this.store.select(store => store.reviews.iHaveDoneAReview).subscribe(iHaveDoneAReview => {
      this.iHaveDoneAReview = iHaveDoneAReview;
    });
    this.suscriptions.push(iHaveDoneAReviewSubscription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  sendReview(formValue: any) {
    const review: Review = {
      text: formValue.review,
      rating: formValue.rating,
      id_user: this.user.id,
      id_game: this.gameId
    }
    this.store.dispatch(reviewsActions.createReview({ review: review }))
  }
}
