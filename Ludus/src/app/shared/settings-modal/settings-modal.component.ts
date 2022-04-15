import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import { ChangeNameModalComponent } from '../change-name-modal/change-name-modal.component';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {

  isChangeNameModalOpen: boolean = false;
  isChangeEmailModalOpen: boolean = false;
  isChangePasswordModalOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  logOut(){
    this.authService.logOut();
    this.dismiss();
    this.router.navigate([environment.routes.login])
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
