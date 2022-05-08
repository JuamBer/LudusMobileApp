import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridGameListComponent } from './grid-game-list.component';
import { IonicModule } from '@ionic/angular';
import { ApplicationPipesAndDirectivesModule } from '../../modules/shared-pipes-and-directives.module';
import { GameSettingsComponent } from '../game-settings/game-settings.component';



@NgModule({
  declarations: [
    GridGameListComponent,
    GameSettingsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ApplicationPipesAndDirectivesModule
  ],
  exports: [
    GridGameListComponent
  ]
})
export class GridGameListModule { }
