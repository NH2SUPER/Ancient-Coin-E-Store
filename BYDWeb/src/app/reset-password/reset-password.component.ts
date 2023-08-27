import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  formGroup: FormGroup;
  passwordControl: FormControl;
  rePasswordControl: FormControl;
  matcher = new MyErrorStateMatcher();

  guid:string='';

  constructor(
    private userService: UserService, private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.passwordControl = new FormControl('', [Validators.required]);
    this.rePasswordControl = new FormControl('', [Validators.required]);
    this.matcher = new MyErrorStateMatcher();
    this.formGroup = new FormGroup({ password: this.passwordControl, rePassword: this.rePasswordControl });

    //get guid from query string
    this.activatedRoute.queryParams.subscribe(params => { this.guid = params['guid']; });
    if (!this.guid){
      alert("Please click the link in your [reset password] email.");
      this.router.navigate(['/Login']);
    }
  }

  ngOnInit(): void {
    $("#divMainSearchBox").hide();

    this.localStorageService.removeData("CurrentUser");
    this.localStorageService.removeData("Token");
    setTimeout(() => {this.sharedService.UpdateUserSignedIn(false);}, 100);
  }

  ngAfterViewInit(): void {
    this.formGroup.setValidators(this.passwordMatchValidator.bind(this));
    this.formGroup.updateValueAndValidity();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password && rePassword && password.value !== rePassword.value) {
      rePassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      setTimeout(() => { rePassword?.setErrors(null); });
      return null;
    }
  }

  public changePassword() {
    var userNewPassword = { GUID: this.guid, Password: this.passwordControl?.value };
    this.userService.changePassword(userNewPassword).subscribe((result) => {
      if (result == -1) {
        alert("Sorry, please try again.");
      } else {

        alert("Changed password succeed. Please go to sign in page.");

        //go to home page
        this.router.navigate(['/Login']);
      }
    });

  }

}
