import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  public user: User = {
    id: '',
    name: '',
    email: ''
  };

  constructor(
    private router: Router,
  ) {}

  settings(){
    this.router.navigate([environment.routes.profile_settings])
  }


}
