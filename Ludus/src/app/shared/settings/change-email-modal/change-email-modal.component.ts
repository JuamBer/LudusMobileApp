import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ChangeEmailDTO } from 'src/models/dtos/ChangeEmailDTO.model';
//NGRX
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.scss'],
})
export class ChangeEmailModalComponent implements OnInit {

  title: string = "Cambiar Email";
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  send(changeEmailDTO: ChangeEmailDTO){
    this.store.dispatch(authActions.changeEmail({ email: changeEmailDTO.email }));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
