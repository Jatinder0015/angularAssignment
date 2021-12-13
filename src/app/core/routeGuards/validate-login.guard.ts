import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginGuard implements CanActivate {

  constructor(private toastr: ToastrService,  private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (localStorage.getItem("loginStatus") === "true") {
        return true;
      } else {
        this.toastr.error("You Have To Login First")
        this.router.navigate(['/']);
        return false;
      }
    
  }
  
}
