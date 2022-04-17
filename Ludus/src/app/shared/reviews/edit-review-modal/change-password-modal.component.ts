import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PasswordValidator } from 'src/utils/PasswordValidator';
import { environment } from 'src/environments/environment';
import { ChangeNameDTO } from 'src/models/dtos/ChangeNameDTO.model';
import { ChangePasswordDTO } from 'src/models/dtos/ChangePasswordDTO.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {

  title: string = "Cambiar Contraseña";
  form: FormGroup = this.formBuilder.group({
    /* current_password: ['', [Validators.required, Validators.minLength(6)]], */
    new_password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_new_password: ['', [Validators.required, Validators.minLength(6)]]
  },{
    validators: PasswordValidator.confirmed('new_password', 'confirm_new_password')
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  send(changePassowrdDTO: ChangePasswordDTO){
    this.authService.updatePassword(changePassowrdDTO.new_password).then(
      (res)=>{
        this.dismiss();
      }
    ).catch(
      (err)=>{
        console.error(err);
      }
    )
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
