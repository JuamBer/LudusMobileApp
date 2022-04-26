//ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { SectionsPage } from './sections.page';

const routes: Routes = [
  {
    path: '',
    component: SectionsPage,

    children: [
      {
        path: 'home',
        loadChildren: () => import('./home-page/home.page.module').then(m => m.HomePageModule),
      },
      {
        path: 'favs',
        loadChildren: () => import('./favs-page/favs.page.module').then(m => m.FavsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-page/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'favs',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SectionsPageRoutingModule {}
