import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRolaGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (sessionStorage.getItem('rola') != null && sessionStorage.getItem('rola') === "1")
      return true;
    else {

      this.router.navigate(['/home'])
      return false
    }
  }
}
