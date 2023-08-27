import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../Models/User/User.model';

import { UserService } from '../Services/user.service';

import { Router } from '@angular/router';

export function firstLetterAlphaValidator(control: AbstractControl) {
  const value = control.value;
  const pattern = /^[a-zA-Z][a-zA-Z0-9]*$/;

  if (!value) {
    return null;
  }
  return pattern.test(value) ? null : { firstLetterAlpha: true };
}

export function phoneValidator(control: AbstractControl) {
  const value = control.value;
  const pattern = /^\+?[1]?\(?\d{3}\)?\d{3}-?\d{4}$/;

  if (!value) { return null; }
  return pattern.test(value) ? null : { invalidPhone: true };
}

export function mobileValidator(control: AbstractControl) {
  const value = control.value;
  const pattern = /^\+?[1]?\(?\d{3}\)?\d{3}-?\d{4}$/;

  if (!value) { return null; }
  return pattern.test(value) ? null : { invalidMobile: true };
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  formGroup: FormGroup;

  emailFormControl: FormControl;
  passwordControl: FormControl;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  phoneControl: FormControl;
  mobileControl: FormControl;
  address1Control: FormControl;
  address2Control: FormControl;
  cityControl: FormControl;
  provinceControl: FormControl;
  postalCodeControl: FormControl;
  countryControl: FormControl;

  matcher: MyErrorStateMatcher;

  public user: User=new User();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.emailFormControl = new FormControl({value:this.user.email, disabled:true}, [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [firstLetterAlphaValidator]);
    this.phoneControl = new FormControl('', [phoneValidator]);
    this.mobileControl = new FormControl('', [mobileValidator]);
    this.firstNameFormControl = new FormControl('', [Validators.required]);
    this.lastNameFormControl = new FormControl('', [Validators.required]);
    this.address1Control = new FormControl('');
    this.address2Control = new FormControl('');
    this.cityControl = new FormControl('');
    this.provinceControl = new FormControl('');
    this.postalCodeControl = new FormControl('');
    this.countryControl = new FormControl('');

    this.matcher = new MyErrorStateMatcher();

    this.formGroup = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordControl,
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      phone: this.phoneControl,
      mobile: this.mobileControl
    });

    this.loadUserProfile();
  }

  loadUserProfile(){
    this.userService.getUserProfile().pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.log('Unauthorized access. Redirecting to login page...');
          this.router.navigate(['/Login']);
        }
        throw error;
      })
    ).subscribe((user) => {
      if (user == -1) {
        alert("Sorry, not found email or password was wrong. Please try again.");
      } else {
        this.user = user;
        this.emailFormControl.setValue(this.user.email);
        this.phoneControl.setValue(this.user.phone);
        this.mobileControl.setValue(this.user.mobile);
        this.firstNameFormControl.setValue(this.user.firstName);
        this.lastNameFormControl.setValue(this.user.lastName);
        this.address1Control.setValue(this.user.address1);
        this.address2Control.setValue(this.user.address2);
        this.cityControl.setValue(this.user.city);
        this.provinceControl.setValue(this.user.province);
        this.postalCodeControl.setValue(this.user.postalCode);
        this.countryControl.setValue(this.user.country);
      }
    });
  }

  updateUserProfile() {

        this.user.email = this.emailFormControl.value;
        this.user.Password = this.passwordControl.value;
        this.user.phone = this.phoneControl.value;
        this.user.mobile = this.mobileControl.value;
        this.user.firstName = this.firstNameFormControl.value;
        this.user.lastName = this.lastNameFormControl.value;
        this.user.address1 = this.address1Control.value;
        this.user.address2 = this.address2Control.value;
        this.user.city = this.cityControl.value;
        this.user.province = this.provinceControl.value;
        this.user.postalCode = this.postalCodeControl.value;
        this.user.country = this.countryControl.value;
  
        this.userService.updateUserProfile(this.user).subscribe((result) => {
          this.router.navigate(['/Dashboard']);
        });        
  }
}
