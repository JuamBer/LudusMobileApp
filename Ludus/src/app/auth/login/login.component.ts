import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { LoginDTO } from 'src/models/dtos/LoginDTO.model';
import { ToastController } from '@ionic/angular';
import { ToastMessage } from 'src/models/resources/ToastMessage.model';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  login(loginDTO: LoginDTO) {
    this.store.dispatch(authActions.loginUser({ loginDTO: loginDTO }))
  }

  goToRegister(){
    this.router.navigate([environment.routes.register])
  }

  loginWithGoogle() {
    this.store.dispatch(authActions.loginUserWithGoogle());
  }
}
