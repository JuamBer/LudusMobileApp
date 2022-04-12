//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//SWIPERJS
import { SwiperModule } from 'swiper/angular';

//STAR RATING
import { NgxStarRatingModule } from 'ngx-star-rating';

//COMOPONETS AND MODULES
import { HomePageRoutingModule } from './homePage-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';
import { HomePage } from './homePage.page';
import { FilterModalComponent } from '../../shared/filter-modal/filter-modal.component';
import { ReviewListComponent } from '../../shared/game/reviews/review-list/review-list.component';
import { ReviewItemComponent } from '../../shared/game/reviews/review-item/review-item.component';
import { QuestionListComponent } from '../../shared/game/questions/question-list/question-list.component';
import { QuestionItemComponent } from '../../shared/game/questions/question-item/question-item.component';
import { GameComponent } from '../../shared/game/game.component';
import { SeekerComponent } from '../../shared/seeker/seeker.component';
import { HorizontalGameListComponent } from '../../shared/horizontal-game-list/horizontal-game-list.component';
import { VerticalGameListComponent } from '../../shared/vertical-game-list/vertical-game-list.component';
import { SpecialGameViewComponent } from '../../shared/special-game-view/special-game-view.component';

//PIPES
import { SafePipe } from '../../../pipes/safe.pipe';
import { GetTypeNamePipe } from '../../../pipes/get-type-name.pipe';
import { GetGenderNamePipe } from '../../../pipes/get-gender-name.pipe';
import { GetUserNamePipe } from '../../../pipes/get-user-name.pipe';

@NgModule({
  imports: [
    //ANGULAR
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    //STAR RATING
    NgxStarRatingModule,

    //SWIPERJS
    SwiperModule,

    //MODULES
    LudusHeaderModule,

    //ROUTING
    HomePageRoutingModule,
  ],
  declarations: [
    //COMPONENTS
    HomePage,
    GameComponent,
    ReviewListComponent,
    ReviewItemComponent,
    QuestionListComponent,
    QuestionItemComponent,
    FilterModalComponent,
    SeekerComponent,
    HorizontalGameListComponent,
    VerticalGameListComponent,
    SpecialGameViewComponent,

    //PIPES
    SafePipe,
    GetTypeNamePipe,
    GetGenderNamePipe,
    GetUserNamePipe
  ]
})
export class HomePageModule {}
