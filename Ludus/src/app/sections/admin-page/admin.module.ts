import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPage } from './admin.page';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SettingsModalComponent } from 'src/app/shared/settings/settings-modal/settings-modal.component';
import { LudusHeaderComponent } from 'src/app/shared/ludus-header/ludus-header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeNameModalComponent } from 'src/app/shared/settings/change-name-modal/change-name-modal.component';
import { ChangeEmailModalComponent } from 'src/app/shared/settings/change-email-modal/change-email-modal.component';
import { ChangePasswordModalComponent } from 'src/app/shared/settings/change-password-modal/change-password-modal.component';
import { ReviewsModule } from 'src/app/shared/reviews/reviews.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPageRoutingModule,
    LudusHeaderModule,
    MatButtonModule,
    LudusHeaderModule,
    ReviewsModule
  ],
  declarations: [
    AdminPage,
    SettingsModalComponent,
    ChangeNameModalComponent,
    ChangeEmailModalComponent,
    ChangePasswordModalComponent,
  ]
})
export class AdminPageModule {}
