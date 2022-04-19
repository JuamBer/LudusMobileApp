//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

//IONIC
import { IonicModule } from '@ionic/angular';

//MODULES
import { AuthRoutingModule } from './auth-routing.module';

//COMPONENTS
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,

    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    AuthRoutingModule
  ]
})
export class AuthModule { }
