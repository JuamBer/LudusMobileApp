//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//IONIC
import { IonicModule } from '@ionic/angular';

//MODULES
import { SectionsPageRoutingModule } from './sections-routing.module';

//COMPONENTS
import { SectionsPage } from './sections.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SectionsPageRoutingModule
  ],
  declarations: [
    SectionsPage,
  ]
})
export class SectionsPageModule {}
