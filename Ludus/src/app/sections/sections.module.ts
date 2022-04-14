import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SectionsPageRoutingModule } from './sections-routing.module';

import { SectionsPage } from './sections.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SectionsPageRoutingModule
  ],
  declarations: [SectionsPage]
})
export class SectionsPageModule {}
