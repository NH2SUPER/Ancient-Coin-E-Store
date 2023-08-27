import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../Models/User/User.model';
import { LocalStorageService } from './localStorage.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private UserSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  UserSignedIn$ = this.UserSignedIn.asObservable();
  UpdateUserSignedIn(newValue: boolean) { this.UserSignedIn.next(newValue); }

  //public CurrentUser!: User;
  private CurrentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  CurrentUser$ = this.CurrentUser.asObservable();
  UpdateCurrentUser(newValue: User) { this.CurrentUser.next(newValue); }

  constructor(
    private localStorageService: LocalStorageService, private userService: UserService,
    private router: Router) 
  {
    this.UpdateCurrentUser(this.localStorageService.getData('CurrentUser'));
    this.UpdateUserSignedIn(!(this.CurrentUser == null));
  }

  ValidateUserProfile() {
    if (this.localStorageService.getData('Token')) {
      //get user profile
      this.userService.getUserProfile().pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Handle the 401 error here
            // For example, you can redirect the user to the login page
            console.log('Unauthorized access. Redirecting to login page...');

            //go to login page
            this.router.navigate(['/Login']);
          }
          // If it's not a 401 error, re-throw the error to be caught by other error handlers
          throw error;
        })
      ).subscribe((user) => {
        if (user == -1) {
          alert("Sorry, not found email or password was wrong. Please try again.");
        } else {
          this.UpdateCurrentUser(user);
          this.UpdateUserSignedIn(true);

          //save current user to local storage
          this.localStorageService.saveData('CurrentUser', user);
        }
      });
    } else {
      this.UserLogout();
    }
  }

  UserLogout(){
    this.localStorageService.removeData("CurrentUser");
    this.localStorageService.removeData("Token");
    this.UpdateUserSignedIn(false);

    this.router.navigate(['/Home']);
  }
}
