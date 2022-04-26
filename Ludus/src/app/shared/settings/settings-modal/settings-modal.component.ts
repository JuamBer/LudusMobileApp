//ANGULAR
import { Component, OnInit } from '@angular/core';

//IONIC
import { ModalController } from '@ionic/angular';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';
import { User } from 'src/models/User';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {

  user: User;
  isChangeNameModalOpen: boolean = false;
  isChangeEmailModalOpen: boolean = false;
  isChangePasswordModalOpen: boolean = false;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(store=>store.auth.user).subscribe(user=>this.user=user);
  }

  logOut(){
    this.store.dispatch(authActions.logoutUser());
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  toggleModal(name: string) {
    switch(name){
      case 'change-name':
        this.isChangeNameModalOpen = !this.isChangeNameModalOpen;
        break;
      case 'change-email':
        this.isChangeEmailModalOpen = !this.isChangeEmailModalOpen;
        break;
      case 'change-password':
        this.isChangePasswordModalOpen = !this.isChangePasswordModalOpen;
        break;
    }
  }
}
