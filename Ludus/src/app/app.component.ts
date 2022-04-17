import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/User';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/state/auth/auth.actions';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user)=>{
        if(user){
          const userLogged: User = {
            id: user.uid,
            name: user.displayName,
            email: user.email
          }
          this.store.dispatch(userActions.loginUser({ user: userLogged }))
          this.store.dispatch(userActions.loadFavsGames({ id: userLogged.id }));

        }
      }
    )

  }
}
