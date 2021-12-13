
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/core/service/user/user-service.service';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = localStorage.getItem("loginStatus")
  private updatingHeaderComponent: Subscription;

  constructor(private loginComponentObj: LoginComponent,
    private service: UserServiceService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router

    

  ) {
    this.updatingHeaderComponent = this.service.getLoginUpdateForHeader().subscribe
      (message => { //message contains the data sent from service
        this.isLoggedIn = localStorage.getItem("loginStatus");
        this.cd.markForCheck();
        // this.cd.detach();


      });

  }
  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.updatingHeaderComponent.unsubscribe();

  }



  ngOnInit(): void {


    console.log(localStorage.getItem("loginStatus"))
    if (localStorage.getItem("loginStatus") == null) {
      console.log("aao g")
      localStorage.setItem("loginStatus", JSON.stringify(false));
      this.isLoggedIn = localStorage.getItem("loginStatus");
    } else {

    }

  }



  login() {

    this.loginComponentObj.showLoginModel();
  }

  signup(signup) {
    this.loginComponentObj.showSignupModel();
  }

  logout() {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    this.isLoggedIn = localStorage.getItem("loginStatus");
    this.cd.markForCheck();
    // this.cd.detach();
    this.router.navigate(['angularAssignment']);
    this.toastr.success("Logout Successfull")
  }

}
