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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  limit: number = 10; // <==== Edit this number to limit API results
  carouselOptions: OwlOptions = {
    loop: true, mouseDrag: false, touchDrag: false, pullDrag: false, dots: true,
    navSpeed: 600, autoplay: false, center: true, nav: false,
    navText: ["<span class='material-icons'>arrow_back_ios</span>", "<span class='material-icons'>arrow_forward_ios</span>"],
    responsive: {
      0: { items: 1, },
      600: { items: 1, },
      1000: { items: 1, }
    }
  };

  items = [
    { id: "1", imgUrl: 'assets/img/banner1.png', caption: 'Slide 1' },
    { id: "2", imgUrl: 'assets/img/banner2.png', caption: 'Slide 2' },
    { id: "3", imgUrl: 'assets/img/banner3.png', caption: 'Slide 3' }
  ];

  public initPrice: number = 10000;
  private hubConnection!: HubConnection;

  coins: any;
  news: any;
  userSignedIn: boolean = false;
  currentUser?: User | null;

  constructor(
    private userService: UserService,
    private coinService: CoinService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

    //check local storage to confirm if need user login
    if (this.localStorageService.getData('CurrentUser')) {
      this.sharedService.UpdateUserSignedIn(true);
      this.sharedService.UpdateCurrentUser(this.localStorageService.getData('CurrentUser'));
      this.router.navigate(['/Dashboard']);
    }
    else {
      this.sharedService.UpdateUserSignedIn(false);
    };

    //connect signalR 
    this.hubConnection = new HubConnectionBuilder().withUrl(WebApi.BYD_API + '/signalRServiceHub').build();
    this.hubConnection.start().then(() => { console.log('Hub connection started'); });
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('Received message:', message);

      if (message.indexOf("CoinId") > -1) {
        let coinInfo = JSON.parse(message);
        let spanCoinPrice = $("#spanCurrentPrice" + coinInfo.CoinId);
        let currentPrice = (coinInfo.CurrentPrice * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        spanCoinPrice.text(currentPrice);
      }
    });
  }

  ngOnInit(): void {
    this.coinService.getCoinsInHomePage().subscribe((data) => { this.coins = data; });

    setTimeout(() => { $("#divMainSearchBox").show(); }, 200);
  }

  gotoRouter(routerName:string){ if (routerName=='CoinList') this.router.navigate(['/'+routerName]); }

  sendMessage() { this.hubConnection.invoke('SendMessage', 'Hello from Angular!'); }

  addCoinToWatchlist() { alert("Please sign in first."); }

  openCoinDetail(coinId: number): void {
    const dialogRef = this.dialog.open(CoinDetailDialogComponent, {
      width: '80%',
      height: '80%',
      data: { View: _.find(this.coins, (item) => item.coinId == coinId) }
    });
  }
}
