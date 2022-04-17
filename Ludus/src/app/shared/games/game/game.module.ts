import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { ReviewsModule } from '../../reviews/reviews.module';
import { LudusHeaderModule } from '../../ludus-header/ludus-header.module';
import { GetGenderNamePipe } from 'src/pipes/get-gender-name.pipe';
import { SafePipe } from 'src/pipes/safe.pipe';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    ReviewsModule,
    LudusHeaderModule,
  ],
  declarations: [
    GameComponent,



    //PIPES
    SafePipe,
    GetGenderNamePipe,
  ]
})
export class GameModule {}
