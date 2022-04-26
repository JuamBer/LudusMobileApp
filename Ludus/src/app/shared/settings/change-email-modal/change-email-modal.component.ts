//ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//IONIC
import { ModalController } from '@ionic/angular';

//NGRX
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';

//MODELS
import { ChangeEmailDTO } from 'src/models/dtos/ChangeEmailDTO.model';


@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.scss'],
})
export class ChangeEmailModalComponent implements OnInit {

  title: string = "Cambiar Email";
  @Input() email: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
    });
  }

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
