import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavsPage } from './favs.page';

import { FavsPageRoutingModule } from './favs-page-routing.module';
import { LudusHeaderModule } from '../../shared/ludus-header/ludus-header.module';
import { GetGamePipe } from 'src/pipes/get-game.pipe';
import { VarDirective } from 'src/utils/ng-var.directive';
import { GridGameListComponent } from 'src/app/shared/games/grid-game-list/grid-game-list.component';
import { GetTypeNamePipe } from 'src/pipes/get-type-name.pipe';

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
  declarations: [
    FavsPage,
    GridGameListComponent,
    GetGamePipe,
    GetTypeNamePipe,
    VarDirective
  ],
  exports: [
    VarDirective,
    GetTypeNamePipe
  ]
})
export class FavsPageModule {}
