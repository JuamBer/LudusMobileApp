import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./homePage/homePage.module').then(m => m.HomePageModule),
      },
      {
        path: 'publicate',
        loadChildren: () => import('./publicatePage/publicatePage.module').then(m => m.PublicatePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profilePage/profilePage.module').then(m => m.ProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
