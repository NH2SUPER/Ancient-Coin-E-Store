import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CoinService } from '../Services/coin.service'
import { SharedService } from '../Services/shared.service';
import { LocalStorageService } from '../Services/localStorage.service';
import { UserService } from '../Services/user.service';

import { WebApi } from '../Models/System/WebApi.model';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CoinDetailDialogComponent } from '../coin-detail-dialog/coin-detail-dialog.component';

import { User } from '../Models/User/User.model';

import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({ selector: 'app-dash-board', templateUrl: './dash-board.component.html', styleUrls: ['./dash-board.component.scss'] })

export class DashBoardComponent {
  limit: number = 10; // <==== Edit this number to limit API results
  carouselOptions: OwlOptions = {
    loop: true, mouseDrag: false, touchDrag: false, pullDrag: false, dots: true,
    navSpeed: 600, autoplay: false, center: true, nav: false,
    navText: ["<span class='material-icons'>arrow_back_ios</span>", "<span class='material-icons'>arrow_forward_ios</span>"],
    responsive: { 0: { items: 1, }, 600: { items: 1, }, 1000: { items: 1, } }
  };

  public initPrice: number = 10000;

  private hubConnection!: HubConnection;

  coins: any;
  news: any;
  userSignedIn: boolean = false;
  currentUser?: User | null;

  constructor(
    private userService: UserService, private coinService: CoinService, private sharedService: SharedService, private localStorageService: LocalStorageService,
    public dialog: MatDialog, private router: Router
  ) {

    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });

    //this.sharedService.ValidateUserProfile();
    //check local storage to confirm if need user login
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
          this.sharedService.UpdateCurrentUser(user);
          this.sharedService.UpdateUserSignedIn(true);

          //save current user to local storage
          this.localStorageService.saveData('CurrentUser', user);
        }
      });


      //connect signalR 
      this.hubConnection = new HubConnectionBuilder().withUrl(WebApi.BYD_API + '/signalRServiceHub').build();
      this.hubConnection.start().then(() => { console.log('Hub connection started'); });
      this.hubConnection.on('ReceiveMessage', (message: string) => {
        console.log('Received message:', message);

        if (message.indexOf("CoinId") > -1) {
          let coinInfo = JSON.parse(message);
          let spanCoinPrice = $("#spanCurrentPrice"+coinInfo.CoinId);
          let currentPrice = (coinInfo.CurrentPrice*1).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          spanCoinPrice.text(currentPrice);
        }
      });

    } else {
      //go to login page
      this.router.navigate(['/Login']);
    };
  }

  ngOnInit(): void {
    this.coinService.getCoinsInHomePage().subscribe((data) => {
      this.coins = data;
      _.each(this.coins, (coin) => {
        if (this.currentUser)
          coin["coinInWatchList"] = _.some(this.currentUser.coinWatchList, (item) => item == coin.coinId);
        else
          coin["coinInWatchList"] = false;
      });
    });

    this.coinService.getNews().subscribe((data) => {
      this.news = data;
    });
  }

  gotoRouter(routerName:string){ if (routerName=='CoinList') this.router.navigate(['/'+routerName]); }

  sendMessage() { this.hubConnection.invoke('SendMessage', 'Hello from Angular!'); }

  addCoinToWatchlist(coinId: number) {
    if (this.userSignedIn) {
      if (this.currentUser) {
        let watchItem = { CoinId: coinId, UserId: this.currentUser.userId };
        this.userService.addCoinToWatchlist(watchItem).subscribe((result) => {
          let clickedCoin = _.find(this.coins, (item) => item.coinId == coinId);
          clickedCoin["coinInWatchList"] = true;

          if (this.currentUser) {
            this.currentUser.coinWatchList = result;
            this.sharedService.UpdateCurrentUser(this.currentUser);
          }
        });
      }
    } else {
      alert("Please sign in first.");
    }
  }

  removeCoinFromWatchlist(coinId: number) {
    if (this.currentUser) {
      let watchItem = { CoinId: coinId, UserId: this.currentUser.userId };
      this.userService.removeCoinFromWatchlist(watchItem).subscribe((result) => {
        let clickedCoin = _.find(this.coins, (item) => item.coinId == coinId);
        clickedCoin["coinInWatchList"] = false;

        if (this.currentUser) {
          this.currentUser.coinWatchList = result;
          this.sharedService.UpdateCurrentUser(this.currentUser);
        }
      });
    }
  }

  openCoinDetail(coinId: number): void {
    const dialogRef = this.dialog.open(CoinDetailDialogComponent, { width: '80%', height: '80%', data: { View: _.find(this.coins, (item) => item.coinId == coinId) }});
  }

}
