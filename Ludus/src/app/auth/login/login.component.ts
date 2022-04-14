import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  userSuscription: Subscription
  form: FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  toastMessage: ToastMessage;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authService.currentMessage.subscribe(toastMessage => {
      this.toastMessage = toastMessage;
      this.presentToast(toastMessage.header, toastMessage.message, toastMessage.icon, toastMessage.position, toastMessage.color);
    });
  }

  login(LoginDTO: LoginDTO) {
    this.authService.login(LoginDTO);
  }

  goToRegister(){
    this.router.navigate([environment.routes.register])
  }

  loginWithGoogle() {
    this.authService.GoogleAuth();
  }

  loginWithApple(){

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
