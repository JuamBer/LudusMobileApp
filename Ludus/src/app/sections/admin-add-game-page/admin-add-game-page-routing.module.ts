//ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { AdminAddGamePage } from './admin-add-game.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddGamePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAddGamePageRoutingModule {}
