import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavsPage } from './favs.page';

import { FavsPageRoutingModule } from './favs-page-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FavsPageRoutingModule,
    LudusHeaderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FavsPage]
})
export class FavsPageModule {}
