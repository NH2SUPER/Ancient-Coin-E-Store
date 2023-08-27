import { Component } from '@angular/core';

import { Coin } from "../Models/Coin/Coin.model"
import { CoinService } from '../Services/coin.service'
import { UserService } from '../Services/user.service'
import { SharedService } from '../Services/shared.service';

import { MatDialog } from '@angular/material/dialog';
import { CoinDetailDialogComponent } from '../coin-detail-dialog/coin-detail-dialog.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

import { User } from '../Models/User/User.model';

import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent {

  myCoinOrders?: Coin[];
  myCheckOut?: Coin[];
  userSignedIn: boolean = false;
  currentUser?: User | null;
  orderIds: number[] = [];

  subtotal: number = 0;
  tax: number = 0;
  shippingFee: number = 0;
  total: number = 0;

  constructor(
    private coinService: CoinService,
    private userService: UserService,
    public dialog: MatDialog,
    private sharedService: SharedService) {
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });

    this.sharedService.ValidateUserProfile();
  }

  ngOnInit(): void {
    this.getUserOffer();
  }

  getUserOffer() {
    if (this.currentUser)
      this.userService.getUserOrders(this.currentUser.userId).subscribe((data) => {
        this.myCoinOrders = data;
        this.calculateCheckoutPrice();

        $("#divSpin").hide();
        $("#divOrder").show();
      });
  }

  calculateCheckoutPrice() {
    let needCheckoutCoins = this.myCoinOrders?.filter(function (f) { return f.coinOrder.needCheckOut; });

    this.subtotal = _.sumBy(needCheckoutCoins, function (o) { return o.coinOrder.purchasePrice; });
    this.tax = _.sumBy(needCheckoutCoins, function (o) { return o.coinOrder.tax; });
    this.shippingFee = _.sumBy(needCheckoutCoins, function (o) { return o.coinOrder.shippingFee; });
    this.total = this.subtotal + this.tax + this.shippingFee;
  }

  selectNeedCheckOutCoin(e: any, coin: any) {
    let clickedCoin = this.myCoinOrders?.find(function (f) { return f.coinId == coin.coinId; });
    if (clickedCoin && clickedCoin.coinOrder) {
      clickedCoin.coinOrder.needCheckOut = e.target.checked;
    }
    this.calculateCheckoutPrice();
  }

  checkOut() {
    if (this.currentUser) {
      //get coinIds
      let needCheckoutCoins = this.myCoinOrders?.filter(function (f) { return f.coinOrder.needCheckOut; });

      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '20%', height: '40%',
        data: { UserId: this.currentUser.userId, Amount: this.total, CoinIds: _.map(needCheckoutCoins, 'coinId'), SubTotal: this.subtotal, ShippingFee: this.shippingFee, Tax: this.tax }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (this.currentUser)
          this.getUserOffer();
      });
    }
  }

  openCoinDetail(coin: any): void {
    const dialogRef = this.dialog.open(CoinDetailDialogComponent, { width: '80%', height: '80%', data: { View: coin } });

    dialogRef.afterClosed().subscribe(result => {
      if (this.currentUser)
        this.coinService.getMyWatchList(this.currentUser.userId).subscribe((data) => {
          // this.coins = data;
          // $("#divSpin").hide();
        });
    });
  }

}
