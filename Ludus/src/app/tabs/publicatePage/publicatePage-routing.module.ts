import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicatePage } from './publicatePage.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PublicatePage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class PublicatePageRoutingModule {}
