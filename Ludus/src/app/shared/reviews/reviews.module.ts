import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import { IonicModule } from '@ionic/angular';




//STAR RATING
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReviewComponent } from './add-review/add-review.component';
import { EditReviewModalComponent } from './edit-review-modal/edit-review-modal.component';
import { ApplicationPipesAndDirectivesModule } from '../modules/shared-pipes-and-directives.module';

@NgModule({
  declarations: [
    ReviewItemComponent,
    ReviewListComponent,
    AddReviewComponent,
    EditReviewModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,

    FormsModule,
    ReactiveFormsModule,

    //STAR RATING
    NgxStarRatingModule,
    ApplicationPipesAndDirectivesModule
  ],
  exports: [
    ReviewListComponent,
    AddReviewComponent
  ]
})
export class ReviewsModule { }
