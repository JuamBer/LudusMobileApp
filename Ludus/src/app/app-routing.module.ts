//ANGULAR
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([environment.routes.home]);
const redirectLoggedInToToHome = () => redirectLoggedInTo([environment.routes.favs]);


const routes: Routes = [
  {
    path: 'sections',
    loadChildren: () => import('./sections/sections.module').then(m => m.SectionsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToToHome
    },
  },
  {
    path: '',
    redirectTo: 'sections',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
