import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/core/service/user/user-service.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  userForLogin: FormGroup;
  userForSignup: FormGroup;
  user: any = {
    id: "",
    userName: "",
    password: ""
  };


  constructor(
    private service: UserServiceService,
    private router: Router,
    private toastr: ToastrService


  ) { }

  ngOnInit(): void {
    this.userForLogin = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),

    });

    this.userForSignup = new FormGroup({

      userNameForSignup: new FormControl('', [Validators.required]),
      userEmailForSignup: new FormControl('', [Validators.required, Validators.email]),
      userPasswordForSignup: new FormControl('', [Validators.required, Validators.minLength(6)]),

    });




  }



  get userEmail() {
    return this.userForLogin.get('userEmail');
  }

  get userPassword() {
    return this.userForLogin.get('userPassword');
  }

  get userNameForSignup() {
    return this.userForSignup.get('userNameForSignup');
  }

  get userEmailForSignup() {
    return this.userForSignup.get('userEmailForSignup');
  }

  get userPasswordForSignup() {
    return this.userForSignup.get('userPasswordForSignup');
  }



  showLoginModel() {

    let element: HTMLElement = document.getElementById('auto_trigger1') as HTMLElement;
    element.click();

  }

  showSignupModel() {

    let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
    element.click();

  }


  closeLoginModel() {
    let element: HTMLElement = document.getElementById('closeModal1') as HTMLElement;
    element.click();
  }

  closeSignupModel() {
    let element: HTMLElement = document.getElementById('closeModal2') as HTMLElement;
    element.click();
  }



  Login() {
    console.log("this.user")
    console.log(this.userForLogin.value)
    this.service.loginUser(this.userForLogin.value.userEmail).subscribe(
      (response: any) => {

        console.log(response);

        if (response.length > 0) {
          console.log("userfound")
          if (response[0].password === this.userForLogin.value.userPassword) {
            console.log("passwordmatched")
            localStorage.setItem("loginStatus", JSON.stringify(true));
            // To update Login/Logout we have to update header component through service
            this.service.sendLoginUpdateToHeader();
            this.closeLoginModel();
            this.toastr.success('Hi ' + response[0].userName + ' !');
            this.router.navigate(['dashboard']);


          } else {
            this.toastr.error("Incorrect Password")
          }

        } else {

          this.toastr.error("No user found with this id")

        }


      },
      (error: any) => {
        console.log(error);

      },
    )

  }

  Signup() {

    console.log(this.userForSignup.value.userEmailForSignup)

    this.user.id = this.userForSignup.value.userEmailForSignup
    this.user.userName = this.userForSignup.value.userNameForSignup
    this.user.password = this.userForSignup.value.userPasswordForSignup

    console.log(this.user)
    this.service.signupUser(this.user).subscribe(
      (response) => {
        this.toastr.success('User Added Successfully');
        this.closeSignupModel();
        this.userForSignup.reset();
      },
      (error) => {
        this.toastr.error("This Email Id is allready registerd with us")
      }
    )


  }


}
