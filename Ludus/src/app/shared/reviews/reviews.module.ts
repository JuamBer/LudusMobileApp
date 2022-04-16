import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import { IonicModule } from '@ionic/angular';
import { GetUserNamePipe } from 'src/pipes/get-user-name.pipe';



//STAR RATING
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReviewComponent } from './add-review/add-review.component';

@NgModule({
  declarations: [
    ReviewItemComponent,
    ReviewListComponent,
    AddReviewComponent,

    GetUserNamePipe,
  ],
  imports: [
    CommonModule,
    IonicModule,

    FormsModule,
    ReactiveFormsModule,

    //STAR RATING
    NgxStarRatingModule,

  ],
  exports: [
    ReviewListComponent,
    AddReviewComponent
  ]
})
export class ReviewsModule { }
