import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ChangeNameDTO } from 'src/models/dtos/ChangeNameDTO.model';
import { ChangePasswordDTO } from 'src/models/dtos/ChangePasswordDTO.model';
import { AuthService } from 'src/services/auth.service';
import { Review } from 'src/models/Review';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';

@Component({
  selector: 'app-edit-review-modal',
  templateUrl: './edit-review-modal.component.html',
  styleUrls: ['./edit-review-modal.component.scss'],
})
export class EditReviewModalComponent implements OnInit {

  title: string = "Editar Tu Opinión";
  @Input() review: Review;
  form: FormGroup = this.formBuilder.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  send(formValue: any){
    const updatedReview: Review = {
      id: this.review.id,
      text: formValue.review,
      rating: formValue.rating,
      id_user: this.review.id_user,
      id_game: this.review.id_game
    }

    this.store.dispatch(reviewsActions.updateReview({ review: updatedReview }));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
