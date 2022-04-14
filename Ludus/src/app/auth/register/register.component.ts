import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PasswordValidator } from 'src/app/providers/PasswordValidator';
import { environment } from 'src/environments/environment';
import { RegisterDTO } from 'src/models/dtos/RegisterDTO.model';
import { ToastMessage } from 'src/models/resources/ToastMessage.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.authService.currentMessage.subscribe(toastMessage => {
      this.toastMessage = toastMessage;
      this.presentToast(toastMessage.header, toastMessage.message, toastMessage.icon, toastMessage.position, toastMessage.color);
    });
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
