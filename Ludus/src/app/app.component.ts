//ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//IONIC
import { ToastController } from '@ionic/angular';

//SERVICES
import { AuthService } from 'src/services/auth.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/state/auth/auth.actions';
import { Subscription } from 'rxjs';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';

//MODELS
import { User } from 'src/models/User';
import { Type } from "src/models/Message.model";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{

  suscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    let authMessageSuscription = this.store.select(store=> store.auth.message).subscribe(
      (message)=>{
        if (message){
          this.presentToast(message.text, message.icon, "top", message.color);

          switch (message.type) {
            case Type.LOGIN_SUCCESS:
              this.router.navigate([environment.routes.home])
              break;
            case Type.LOGIN_ERROR:
              this.router.navigate([environment.routes.login])
              break;
            case Type.LOGOUT_SUCCESS:
              this.router.navigate([environment.routes.login])
              break;
            case Type.REGISTER_SUCCESS:
              this.router.navigate([environment.routes.home])
              break;
          }
        }
      }
    )
    this.suscriptions.push(authMessageSuscription)

    let getUserSuscription = this.authService.getUser().subscribe(
      (user)=>{
        if(user){
          const userLogged: User = {
            id: user.uid,
            name: user.displayName,
            email: user.email
          }
          this.store.dispatch(userActions.loginUserSuccess({ user: userLogged }))
          this.store.dispatch(userActions.loadFavsGames({ id: userLogged.id }));
        }
      }
    )
    this.suscriptions.push(getUserSuscription)

    let reviewMessageSuscription = this.store.select(store => store.reviews.message).subscribe(
      (message)=>{
        if (message) {
          this.presentToast(message.text, message.icon, "top", message.color);
        }
      }
    )
    this.suscriptions.push(reviewMessageSuscription)
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  async presentToast(msg: string, icon: string, position: "top" | "bottom" | "middle", color: string) {
    const toast = await this.toastController.create({
      message: msg,
      icon: icon,
      position: position,
      color: color,
      duration: 1500
    });
    await toast.present();
  }
}
