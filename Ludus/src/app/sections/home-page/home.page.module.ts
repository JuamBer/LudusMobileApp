//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//COMPONENTS
import { HomePage } from './home.page';
import { FilterModalComponent } from '../../shared/filter-modal/filter-modal.component';
import { SeekerComponent } from '../../shared/seeker/seeker.component';
import { HorizontalGameListComponent } from '../../shared/games/horizontal-game-list/horizontal-game-list.component';
import { VerticalGameListComponent } from '../../shared/games/vertical-game-list/vertical-game-list.component';
import { SpecialGameViewComponent } from '../../shared/games/special-game-view/special-game-view.component';

//MODULES
import { GameModule } from 'src/app/shared/games/game/game.module';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ApplicationPipesAndDirectivesModule } from 'src/app/shared/modules/shared-pipes-and-directives.module';

//SWIPERJS
import { SwiperModule } from 'swiper/angular';

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
    HomePageRoutingModule,
    ApplicationPipesAndDirectivesModule
  ],
  declarations: [
    //COMPONENTS
    HomePage,
    FilterModalComponent,
    SeekerComponent,
    HorizontalGameListComponent,
    VerticalGameListComponent,
    SpecialGameViewComponent,
  ],
})
export class HomePageModule {}
