//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//MODULES
import { ReviewsModule } from '../../reviews/reviews.module';
import { LudusHeaderModule } from '../../ludus-header/ludus-header.module';
import { ApplicationPipesAndDirectivesModule } from '../../modules/shared-pipes-and-directives.module';

//COMPONENTS
import { GameComponent } from './game.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ReviewsModule,
    LudusHeaderModule,
    ApplicationPipesAndDirectivesModule
  ],
  declarations: [
    GameComponent,
  ]
})
export class GameModule {}
