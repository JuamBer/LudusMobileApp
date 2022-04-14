import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { ReviewService } from 'src/services/review.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/state/auth/auth.actions';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';

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
  reviews: any[]

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(store => store.auth.user).subscribe(user => this.user = user)

    this.reviewService.getReviewsByGameId(this.gameId).subscribe(
      (reviews) => {
        this.reviews = reviews.map((t: any) => {
          return {
            id: t.payload.doc.id,
            ...t.payload.doc.data()
          };
        })
      }
    )
  }

  sendReview(formValue: any){
    this.reviewService.create(this.gameId, this.user.id, formValue.rating, formValue.review);
  }

}
