//ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//IONIC
import { ModalController } from '@ionic/angular';

//NGRX
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';

//MODELS
import { ChangePasswordDTO } from 'src/models/dtos/ChangePasswordDTO.model';

//UTILS
import { PasswordValidator } from 'src/utils/PasswordValidator';

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
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  send(changePassowrdDTO: ChangePasswordDTO){
    this.store.dispatch(authActions.changePassword({ password: changePassowrdDTO.new_password }));
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
