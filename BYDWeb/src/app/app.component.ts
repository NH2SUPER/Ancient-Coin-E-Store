import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

import { User } from './Models/User/User.model';
import { SharedService } from './Services/shared.service';
import { LocalStorageService } from './Services/localStorage.service';

import { MatDialog } from '@angular/material/dialog';
import { UserRegisterDialogComponent } from './user-register-dialog/user-register-dialog.component';

import { Router, NavigationExtras } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'BYDWeb';
  userSignedIn = false;
  currentUser?: User | null;
  selectedCategoryId: number = 0;
  searchKeyword: string = '';

  constructor(public dialog: MatDialog, private router: Router,
    private sharedService: SharedService, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });
  }

  gotoRouter(routerName: string) {
    if (this.userSignedIn || routerName == 'CoinList')
      this.router.navigate(['/' + routerName]);
    else
      this.router.navigate(['/Login']);
  }

  gotoHome() {
    this.router.navigate(['/Home']);
  }

  logout() {
    this.localStorageService.removeData("CurrentUser");
    this.localStorageService.removeData("Token");
    this.sharedService.UpdateUserSignedIn(false);
    this.userSignedIn = false;

    this.router.navigate(['/Home']);
  }

  login() {
    this.router.navigate(['/Login']);
  }

  register() {
    const dialogRef = this.dialog.open(UserRegisterDialogComponent, { width: '50%', height: '80%' });
  }

  searchCoins() {
    // if (this.searchKeyword.trim().length > 2) {
      const navigationExtras: NavigationExtras = { queryParams: { sw: this.selectedCategoryId + "^" + this.searchKeyword } };
      this.router.navigate(['/CoinList'], navigationExtras);
    // } else{
    //   this.router.navigate(['/CoinList']);
    // }
  }
}
