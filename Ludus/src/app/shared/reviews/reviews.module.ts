//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//COMPONENTS
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import { EditReviewModalComponent } from './edit-review-modal/edit-review-modal.component';
import { AddReviewComponent } from './add-review/add-review.component';

//MODULES
import { ApplicationPipesAndDirectivesModule } from '../modules/shared-pipes-and-directives.module';

//STAR RATING
import { NgxStarRatingModule } from 'ngx-star-rating';

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
