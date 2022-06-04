import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { LoginDTO } from 'src/models/dtos/LoginDTO.model';
import { RegisterDTO } from 'src/models/dtos/RegisterDTO.model';
import { User } from 'src/models/User';
import { environment } from '../environments/environment';
import { GoogleAuthProvider } from 'firebase/auth';
import { Game } from 'src/models/Game';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}


  getUser() {
    return this.auth.authState
  }

  async loginUser(LoginDTO: LoginDTO): Promise<any> {
    return await this.auth.signInWithEmailAndPassword(LoginDTO.email, LoginDTO.password)
  }

  async register(registerDTO: RegisterDTO) {
    return await this.auth.createUserWithEmailAndPassword(registerDTO.email, registerDTO.password);
  }

  async logOut() {
    return await this.auth.signOut();
  }

  async googleLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      await firebase.auth().signInWithRedirect(provider).then(async () => {
        await firebase.auth().getRedirectResult().then(result => {
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

          console.log(user);

          return result;
        }).catch(function (error) {
          console.log(error.message);
          return error;
        });
      });
    } catch (error) {
      return error
    }
  }

  async loginWithGoogle() {
    return await this.authWithGoogle(new GoogleAuthProvider());
  }

  async authWithGoogle(provider: firebase.auth.AuthProvider) {
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

      return result;

    } catch (error) {
      return error
    }
  }

  async updateName(newName: string) {
    return await this.auth.currentUser.then(
      async (fuser) => {
        const updatedUser: User = {
          id: fuser.uid,
          name: newName,
          email: fuser.email
        }
        this.updateMyUserTable(updatedUser);
        return await fuser.updateProfile({ displayName: newName });
      }
    )
  }

  async updateEmail(newEmail: string) {
    return await this.auth.currentUser.then(
      async (fuser) => {
        const updatedUser: User = {
          id: fuser.uid,
          name: fuser.displayName,
          email: newEmail
        }
        this.updateMyUserTable(updatedUser);
        return await fuser.updateEmail(newEmail);
      }
    )
  }

  async updatePassword(newPassword: string) {
    return await this.auth.currentUser.then(
      async (fuser) => {
        return await fuser.updatePassword(newPassword);
      }
    )
  }

  updateMyUserTable(updatedUser: User) {
    this.firestore.collection(environment.db_tables.users).doc(updatedUser.id).set({ ...updatedUser });
  }

}
