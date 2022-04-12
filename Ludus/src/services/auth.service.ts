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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user;

  private toastMessage: BehaviorSubject<ToastMessage> = new BehaviorSubject({} as ToastMessage);
  currentMessage: Observable<ToastMessage> = this.toastMessage.asObservable();

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.auth.authState.subscribe(
      (user) => {
        this.user = user;
      }
    )
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }
  isLogged() {
    return this.auth.authState.pipe(
      map(user => user == null)
    );
  }

  getUser() {
    return this.auth.currentUser;
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then(
      (res) => {
        console.log(res);

        const toastMessage: ToastMessage = {
          header: "Perfecto",
          message: "Entrando...",
          icon: "alert-circle",
          position: "top",
          color: "success",
        }
        this.toastMessage.next(toastMessage);
        this.router.navigate(['/tabs/home'])
      }
    ).catch(
      (err) => {
        const toastMessage: ToastMessage = {
          header: "Error",
          message: err.message,
          icon: "alert-circle",
          position: "top",
          color: "danger",
        }
        this.toastMessage.next(toastMessage);
      }
    );
  }
  async AuthLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.auth
        .signInWithPopup(provider);
      console.log(result);
      this.user = result;
      const newUser: User = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email
      };

      this.firestore.collection('users').doc(`${result.user.uid}`).set({
        ...newUser
      });

      console.log('You have been successfully logged in!');
    } catch (error) {
      console.log(error);
    }
  }

  login(LoginDTO: LoginDTO) {
    this.auth.signInWithEmailAndPassword(LoginDTO.email, LoginDTO.password).then(
      (res) => {
        const toastMessage: ToastMessage = {
          header: "Perfecto",
          message: "Entrando...",
          icon: "alert-circle",
          position: "top",
          color: "success",
        }
        this.toastMessage.next(toastMessage);
        this.router.navigate(['/tabs/home'])
      }
    ).catch(
      (err) => {
        const toastMessage: ToastMessage = {
          header: "Error",
          message: err.message,
          icon: "alert-circle",
          position: "top",
          color: "danger",
        }
        this.toastMessage.next(toastMessage);
      }
    );
  }

  register(registerDTO: RegisterDTO) {
    console.log("register()")
    this.auth.createUserWithEmailAndPassword(registerDTO.email, registerDTO.password).then(
      ({ user }) => {

        const newUser: User = {
          id: user.uid,
          name: registerDTO.name,
          email: registerDTO.email
        };

        this.firestore.collection('users').doc(`${user.uid}`).set({
          ...newUser
        });

        const toastMessage: ToastMessage = {
          header: "Usuario Registrado",
          message: "Entrando...",
          icon: "alert-circle",
          position: "top",
          color: "success",
        }
        this.toastMessage.next(toastMessage);
        this.router.navigate(['/tabs/home'])
      }
    ).catch(
      (err) => {
        const toastMessage: ToastMessage = {
          header: "Error",
          message: err.message,
          icon: "alert-circle",
          position: "top",
          color: "danger",
        }
        this.toastMessage.next(toastMessage);
      }
    );
  }

  logOut() {
    const toastMessage: ToastMessage = {
      header: "Saliendo",
      message: "Espera un segundo...",
      icon: "alert-circle",
      position: "top",
      color: "success",
    }
    this.toastMessage.next(toastMessage);

    return this.auth.signOut();
  }


}
