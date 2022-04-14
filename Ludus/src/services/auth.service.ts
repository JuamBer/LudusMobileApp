import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from "firebase/compat/app";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDTO } from 'src/models/dtos/LoginDTO.model';
import { RegisterDTO } from 'src/models/dtos/RegisterDTO.model';
import { ToastMessage } from 'src/models/resources/ToastMessage.model';
import { User } from 'src/models/User';
import { environment } from '../environments/environment';
import { GoogleAuthProvider } from 'firebase/auth';
import { LoggedGuard } from 'src/guards/logged.guard';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>
  ) {}

  isAuth() {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }

  getUser() {
    return this.auth.authState
  }

  // EMAIL AND PASSWORD AUTH
  login(LoginDTO: LoginDTO) {
    this.auth.signInWithEmailAndPassword(LoginDTO.email, LoginDTO.password).then(
      (res: any) => {

        const user: User = {
          id: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }

        this.store.dispatch(authActions.loginUser({ user: user}));
        this.router.navigate([environment.routes.home])
      }
    ).catch(
      (err) => {
        console.error(err);
      }
    );
  }

  register(registerDTO: RegisterDTO) {
    this.auth.createUserWithEmailAndPassword(registerDTO.email, registerDTO.password).then(
      (res: any) => {
        console.log("register");
        this.updateProfile(registerDTO.name).then(
          (res)=>{
            console.log("updateProfile");
          }
        ).catch(
          (err)=>{
            console.error(err);
          }
        )

        const newUser: User = {
          id: res.user.uid,
          name: registerDTO.name,
          email: registerDTO.email
        };

        this.store.dispatch(authActions.loginUser({ user: newUser }));
        this.router.navigate([environment.routes.home])
      }
    ).catch(
      (err) => {
        console.error(err);
      }
    );
  }

  //LOG OUT
  logOut() {
    this.store.dispatch(authActions.logoutUser());
    return this.auth.signOut();
  }

  //GOOGLE AUTH
  async googleAuth() {
    try {
      const res = await this.authLogin(new GoogleAuthProvider());
      this.router.navigate([environment.routes.home]);
    } catch (err) {
      console.error(err);
    }
  }
  async authLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.auth.signInWithPopup(provider);

      const user: User = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email
      };


      this.store.dispatch(authActions.loginUser({ user: user }));

    } catch (error) {
      console.error(error);
    }
  }

  //UPDATE
  async updateProfile(displayName: string) {
    const updatedProfile = {
      displayName: displayName,
    }
    return (await this.auth.currentUser).updateProfile(updatedProfile);
  }


}
