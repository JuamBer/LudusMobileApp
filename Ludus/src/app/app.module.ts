import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import firebase + enviornment
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './state/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GamesEffects } from './state/games/games.effects';
import { ReviewsEffects } from './state/reviews/reviews.effects';
import { GendersEffects } from './state/genders/genders.effects';
import { AuthEffects } from './state/auth/auth.effects';
import { TypesEffects } from './state/types/types.effects';
import { ComplexitiesEffects } from './state/complexities/complexities.effects';
import { ApplicationPipesAndDirectivesModule } from './shared/modules/shared-pipes-and-directives.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    //ANGULAR
    BrowserModule,
    CommonModule,

    //IONIC
    IonicModule.forRoot(),

    //MODULES
    ApplicationPipesAndDirectivesModule,
    AppRoutingModule,

    //FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,


    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    //NGRX
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([GamesEffects, ReviewsEffects, GendersEffects, AuthEffects, TypesEffects, ComplexitiesEffects])
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}
