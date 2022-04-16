import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router
  ){}

  canActivate(): Promise<boolean>{
    return this.auth.currentUser.then(
      (user)=>{
        console.log(user);

        if(user != null){
          return true;
        }else {
          this.router.navigate([environment.routes.login]);
          return false
        }
      }
    ).catch(
      (err)=>{

        this.router.navigate([environment.routes.login]);
        return false;
      }
    )
  }

}
