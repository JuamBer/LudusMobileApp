import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profilePage',
  templateUrl: 'profilePage.page.html',
  styleUrls: ['profilePage.page.scss']
})
export class ProfilePage {

  public user: User = {
    id: '',
    name: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    const firebaseUser = this.authService.user.multiFactor.user;
    this.userService.getUser(firebaseUser.uid).subscribe(
      (user)=>{
        this.user = user
      }
    )

  }

  async logOut() {
    try {
      await this.authService.logOut();
      this.router.navigate(['/login'])
    } catch (err) {
      alert(err.message)
    }
  }

  settings(){
    this.router.navigate(['/tabs/profile/settings'])
  }


}
