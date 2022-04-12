import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LudusHeaderComponent } from './ludus-header.component';
import { IonicModule } from '@ionic/angular';



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
