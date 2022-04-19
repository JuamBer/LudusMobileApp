import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { ReviewsModule } from '../../reviews/reviews.module';
import { LudusHeaderModule } from '../../ludus-header/ludus-header.module';
import { ApplicationPipesAndDirectivesModule } from '../../modules/shared-pipes-and-directives.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    ReviewsModule,
    LudusHeaderModule,
    ApplicationPipesAndDirectivesModule
  ],
  declarations: [
    GameComponent,
  ]
})
export class GameModule {}
