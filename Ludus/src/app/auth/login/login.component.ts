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
import * as userActions from 'src/app/state/auth/auth.actions';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  toastMessage: ToastMessage;
  suscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    let authSuscription = this.store.select(store => store.auth).subscribe(auth => {
      if (auth.success){
        this.presentToast('Login Exitoso','Entrando...','info','top','success');
      }
    })
    this.suscriptions.push(authSuscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }
  login(LoginDTO: LoginDTO) {
    this.authService.login(LoginDTO);
  }

  goToRegister(){
    this.router.navigate([environment.routes.register])
  }

  loginWithGoogle() {
    this.authService.googleAuth();
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
