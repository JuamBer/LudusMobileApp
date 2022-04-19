//ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';
import { environment } from 'src/environments/environment';

//MODELS
import { RegisterDTO } from 'src/models/dtos/RegisterDTO.model';

//UTILS
import { PasswordValidator } from 'src/utils/PasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{

  form: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: PasswordValidator.confirmed('password', 'confirmPassword')
    }
  );

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  register(registerDTO: RegisterDTO) {
    this.store.dispatch(authActions.register({ registerDTO: registerDTO }));
  }

  goToLogin() {
    this.router.navigate([environment.routes.login])
  }
}
