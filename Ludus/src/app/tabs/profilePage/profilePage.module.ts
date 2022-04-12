import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profilePage.page';

import { ProfilePageRoutingModule } from './profilePage-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SettingsComponent } from 'src/app/shared/settings/settings.component';
import { LudusHeaderComponent } from 'src/app/shared/ludus-header/ludus-header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    LudusHeaderModule,
    MatButtonModule,
    LudusHeaderModule
  ],
  declarations: [
    ProfilePage,
    SettingsComponent
  ]
})
export class ProfilePageModule {}
