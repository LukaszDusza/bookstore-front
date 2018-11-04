import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private loggedIn = false;

  constructor(private auth: AuthService, private router: Router) {

    this.auth.isLoggedId().subscribe((loggedId: boolean) => {
      this.loggedIn = loggedId;
    });

   }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loggedIn) {
      this.router.navigateByUrl('/login');
    }
    return this.loggedIn;
  }


}



