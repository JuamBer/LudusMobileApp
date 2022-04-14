import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SettingsModalComponent } from 'src/app/shared/settings-modal/settings-modal.component';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{

  user: User = {
    id: '',
    name: '',
    email: ''
  };
  isSettingsModalOpen: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.store.select(store => store.auth.user).subscribe(
      (user)=>{
        this.user = user;
      }
    )
  }

  toggleFilterModal() {
    this.isSettingsModalOpen = !this.isSettingsModalOpen;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SettingsModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
