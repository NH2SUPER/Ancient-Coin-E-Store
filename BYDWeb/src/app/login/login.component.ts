import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

import { User } from '../Models/User/User.model';
import { UserBase } from '../Models/User/UserBase.model';

import { UserService } from '../Services/user.service';
import { SharedService } from '../Services/shared.service';
import { LocalStorageService } from '../Services/localStorage.service';

import * as $ from 'jquery';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  matcher: MyErrorStateMatcher;

  constructor(
    private userService: UserService, private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.matcher = new MyErrorStateMatcher();

    this.formGroup = new FormGroup({ email: this.emailFormControl, password: this.passwordControl });
  }

  ngOnInit(): void {
    $("#divMainSearchBox").hide();

    this.localStorageService.removeData("CurrentUser");
    this.localStorageService.removeData("Token");
    setTimeout(() => { this.sharedService.UpdateUserSignedIn(false); }, 100);
  }

  formGroup: FormGroup;
  emailFormControl: FormControl;
  passwordControl: FormControl;


  // public user: User = new User;
  // public isRememberMe: boolean = false;

  public signIn() {
    let userBase: UserBase = {
      Username: this.emailFormControl.value,
      Password: this.passwordControl.value
    };

    this.userService.signIn(userBase).subscribe((result) => {
      if (result == -1) {
        alert("Sorry, not found email or password was wrong. Please try again.");
      } else {
        //save token to local storage
        this.localStorageService.saveData('Token', result);

        //get user profile
        this.userService.getUserProfile().subscribe((user) => {
          if (user == -1) {
            alert("Sorry, not found email or password was wrong. Please try again.");
          } else {
            this.sharedService.UpdateCurrentUser(user);
            this.sharedService.UpdateUserSignedIn(true);

            //save current user to local storage
            this.localStorageService.saveData('CurrentUser', user);

            $("#divMainSearchBox").show();

            //go to home page
            this.router.navigate(['/Dashboard']);
          }
        });


      }
    });

  }

  forgotPassword() {
    $("#formLogin").hide();
    $("#divForgetPasswordLink").hide();
    $("#divForgetPasswordForm").show();
  }

  public userEmail: string = "";

  sendForgetPasswordEmail() {

    this.userService.forgetPassword(this.userEmail).subscribe(() => {
      alert("A [Forget Password] email was sent to your email address, please click the link to reset password.");

      this.userEmail = "";
      $("#formLogin").show();
      $("#divForgetPasswordLink").show();
      $("#divForgetPasswordForm").hide();
    });
  }
}
