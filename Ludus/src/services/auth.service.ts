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

//NGRX
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {
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

        const newUser: User = {
          id: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          favs_games: []
        }

        this.updateMyUserTable(newUser);
        this.store.dispatch(authActions.loginUser({ user: newUser }));

        this.updateName(registerDTO.name);

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
        email: result.user.email,
        favs_games: []
      };

      this.firestore.collection(environment.db_tables.users).doc(user.id).get().toPromise().then(
        (res) => {
          if (!res.exists) {
            this.updateMyUserTable(user);
          }
        }
      ).catch(err => console.error(err))


      this.store.dispatch(authActions.loginUser({ user: user }));

    } catch (error) {
      console.error(error);
    }
  }

  //UPDATE
  updateMyUserTable(updatedUser: User){
    this.firestore.collection(environment.db_tables.users).doc(updatedUser.id).set({ ...updatedUser });
  }

  updateName(newName: string) {
    this.auth.currentUser.then(
      (fUser)=>{
        fUser.updateProfile({ displayName: newName }).then(
            () => {
              const updatedUser: User = {
                id: fUser.uid,
                name: newName,
                email: fUser.email
              }
              this.updateMyUserTable(updatedUser);
              this.store.dispatch(authActions.changeName({ name: newName }));
            }
          ).catch(err => console.error(err))
      }
    ).catch(err => console.error(err))
  }

  updateEmail(newEmail: string) {
    this.auth.currentUser.then(
      (fUser) => {
        fUser.updateEmail(newEmail).then(
          () => {
            const updatedUser: User = {
              id: fUser.uid,
              name: fUser.displayName,
              email: newEmail,
            }
            this.updateMyUserTable(updatedUser);
            this.store.dispatch(authActions.changeEmail({ email: newEmail }));
          }
        ).catch(err => console.error(err))
      }
    ).catch(err => console.error(err))
  }

  async updatePassword(newPassword: string) {
    this.auth.currentUser.then(
      (fUser) => {
        fUser.updatePassword(newPassword).then(
          () => {}
        ).catch(err => console.error(err))
      }
    ).catch(err => console.error(err))
  }


}
