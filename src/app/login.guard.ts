import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(
    private router: Router

  ) { }

  canActivate() {
    const token = localStorage.token_peliALdia;
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
