//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//MODULES
import { FavsPageRoutingModule } from './favs-page-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';

//COMPONENTS
import { FavsPage } from './favs.page';
import { GridGameListComponent } from 'src/app/shared/games/grid-game-list/grid-game-list.component';
import { ApplicationPipesAndDirectivesModule } from 'src/app/shared/modules/shared-pipes-and-directives.module';


@NgModule({
  declarations: [
    FavsPage,
    GridGameListComponent,
  ],
  imports: [
    //ANGULAR
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //IONIC
    IonicModule,

    //MODULES
    FavsPageRoutingModule,
    LudusHeaderModule,
    ApplicationPipesAndDirectivesModule
  ],

})
export class FavsPageModule {}
