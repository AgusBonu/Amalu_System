import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private auth: AuthService, 
        private router: Router) {
      }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  
        return this.verifyLogin(url);
    }

    verifyLogin(url) : boolean{
        if(!this.isLoggedIn()){
            this.router.navigate(['/pages/login']);
            return false;
        }
        else if(this.isLoggedIn()){
            return true;
        }
    }

    public isLoggedIn(): boolean{
      let status = false;
      if( localStorage.getItem('isLoggedIn') == "true"){
        status = true;
      }
      else{
        status = false;
      }
      return status;
  }
}