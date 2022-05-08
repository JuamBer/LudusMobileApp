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
import { GridGameListComponent } from 'src/app/shared/games/grid-game-list/grid-game-list.component';
import { GridGameListModule } from 'src/app/shared/games/grid-game-list/grid-game-list.module';
import { GameSettingsComponent } from 'src/app/shared/games/game-settings/game-settings.component';

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
    ReviewsModule,
    GridGameListModule
  ],
  declarations: [
    AdminPage,
  ]
})
export class AdminPageModule {}
