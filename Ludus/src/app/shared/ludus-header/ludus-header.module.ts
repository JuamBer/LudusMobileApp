//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//IONIC
import { IonicModule } from '@ionic/angular';

//COMPONENTS
import { LudusHeaderComponent } from './ludus-header.component';

@NgModule({
  declarations: [LudusHeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LudusHeaderComponent
  ]
})
export class LudusHeaderModule { }
