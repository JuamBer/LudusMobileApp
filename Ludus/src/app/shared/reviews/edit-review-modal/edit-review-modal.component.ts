//ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//IONIC
import { ModalController } from '@ionic/angular';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';

//MODELS
import { Review } from 'src/models/Review';

@Component({
  selector: 'app-edit-review-modal',
  templateUrl: './edit-review-modal.component.html',
  styleUrls: ['./edit-review-modal.component.scss'],
})
export class EditReviewModalComponent implements OnInit {

  title: string = "Editar Tu Opinión";
  @Input() review: Review;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      rating: [this.review.rating, Validators.required],
      review: [this.review.text, Validators.required]
    });
  }

  send(formValue: any){
    const updatedReview: Review = {
      id: this.review.id,
      text: formValue.review,
      rating: formValue.rating,
      id_user: this.review.id_user,
      id_game: this.review.id_game
    }

    this.store.dispatch(reviewsActions.updateReview({ review: updatedReview, oldReview: this.review}));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
