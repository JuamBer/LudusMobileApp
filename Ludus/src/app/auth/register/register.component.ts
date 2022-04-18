import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PasswordValidator } from 'src/utils/PasswordValidator';
import { RegisterDTO } from 'src/models/dtos/RegisterDTO.model';
import { ToastMessage } from 'src/models/resources/ToastMessage.model';
import { AuthService } from 'src/services/auth.service';
//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/state/auth/auth.actions';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy{

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
  toastMessage: ToastMessage;
  suscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    let authSuscription = this.store.select(store => store.auth).subscribe(auth => {
      if (auth.success) {
        this.presentToast('Registro Exitoso', 'Entrando...', 'info', 'top', 'success');
      }
    })
    this.suscriptions.push(authSuscription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  register(registerDTO: RegisterDTO) {
    this.authService.register(registerDTO);
  }

  goToLogin() {
    this.router.navigate([environment.routes.login])
  }

  async presentToast(header: string, message: string, icon: string, position: "top" | "bottom" | "middle", color: string) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      icon: icon,
      position: position,
      color: color,
      duration: 1500
    });
    await toast.present();
  }

}
