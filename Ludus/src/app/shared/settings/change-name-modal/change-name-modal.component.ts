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
import { ChangeNameDTO } from 'src/models/dtos/ChangeNameDTO.model';

@Component({
  selector: 'app-change-name-modal',
  templateUrl: './change-name-modal.component.html',
  styleUrls: ['./change-name-modal.component.scss'],
})
export class ChangeNameModalComponent implements OnInit {

  title: string = "Cambiar Nombre";
  @Input() name: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.form =this.formBuilder.group({
      name: [this.name, [Validators.required]],
    });
  }

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
