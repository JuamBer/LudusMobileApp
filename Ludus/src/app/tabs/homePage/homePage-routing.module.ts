//ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMOPONETS AND MODULES
import { GameComponent } from '../../shared/game/game.component';
import { HomePage } from './homePage.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'game/:id',
    component: GameComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
