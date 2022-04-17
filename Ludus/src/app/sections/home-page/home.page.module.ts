//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//SWIPERJS
import { SwiperModule } from 'swiper/angular';



//COMOPONETS AND MODULES
import { HomePageRoutingModule } from './home-page-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';
import { HomePage } from './home.page';
import { FilterModalComponent } from '../../shared/filter-modal/filter-modal.component';
import { GameComponent } from '../../shared/games/game/game.component';
import { SeekerComponent } from '../../shared/seeker/seeker.component';
import { HorizontalGameListComponent } from '../../shared/games/horizontal-game-list/horizontal-game-list.component';
import { VerticalGameListComponent } from '../../shared/games/vertical-game-list/vertical-game-list.component';
import { SpecialGameViewComponent } from '../../shared/games/special-game-view/special-game-view.component';

//PIPES
import { SafePipe } from '../../../pipes/safe.pipe';
import { GetTypeNamePipe } from '../../../pipes/get-type-name.pipe';
import { GetGenderNamePipe } from '../../../pipes/get-gender-name.pipe';
import { GetUserNamePipe } from '../../../pipes/get-user-name.pipe';
import { ReviewsModule } from 'src/app/shared/reviews/reviews.module';
import { GameModule } from 'src/app/shared/games/game/game.module';

@NgModule({
  imports: [
    //ANGULAR
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    //SWIPERJS
    SwiperModule,

    //MODULES
    GameModule,

    //ROUTING
    HomePageRoutingModule,
  ],
  declarations: [
    //COMPONENTS
    HomePage,
    FilterModalComponent,
    SeekerComponent,
    HorizontalGameListComponent,
    VerticalGameListComponent,
    SpecialGameViewComponent,


    GetTypeNamePipe,
  ]
})
export class HomePageModule {}
