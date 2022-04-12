import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicatePage } from './publicatePage.page';

import { PublicatePageRoutingModule } from './publicatePage-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PublicatePageRoutingModule,
    LudusHeaderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PublicatePage]
})
export class PublicatePageModule {}
