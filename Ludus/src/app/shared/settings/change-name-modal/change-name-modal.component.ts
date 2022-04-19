import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ChangeNameDTO } from 'src/models/dtos/ChangeNameDTO.model';
import { AuthService } from 'src/services/auth.service';
//NGRX
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';
@Component({
  selector: 'app-change-name-modal',
  templateUrl: './change-name-modal.component.html',
  styleUrls: ['./change-name-modal.component.scss'],
})
export class ChangeNameModalComponent implements OnInit {

  title: string = "Cambiar Nombre";
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  send(changeNameDTO: ChangeNameDTO){
    this.store.dispatch(authActions.changeName({ name: changeNameDTO.name}));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
