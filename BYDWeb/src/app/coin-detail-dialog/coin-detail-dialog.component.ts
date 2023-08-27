import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coin } from '../Models/Coin/Coin.model';
import { User } from '../Models/User/User.model';

import { SharedService } from '../Services/shared.service';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import * as $ from 'jquery';

export interface CoinDetailDialogComponentData { View?: Coin }

@Component({
  selector: 'app-coin-detail-dialog',
  templateUrl: './coin-detail-dialog.component.html',
  styleUrls: ['./coin-detail-dialog.component.scss']
})
export class CoinDetailDialogComponent {

  public currentCoin: any;
  currentCoinImage: string = '';
  currentCoinOfferPrice: number = 0;
  currentCoinNoticePrice: number = 0;
  currentUser?: User | null;
  coinInWatchList: boolean = false;
  userSignedIn: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<CoinDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CoinDetailDialogComponentData,
    private sharedService: SharedService, private userService: UserService, private router: Router
  ) {
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });

    this.currentCoin = data.View;
    this.currentCoinImage = this.currentCoin.imageUrls[0];
  }

  ngOnInit(): void {
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });
    if (this.currentUser)
      this.coinInWatchList = _.some(this.currentUser.coinWatchList, (item) => item == this.currentCoin.coinId);
  }

  addCoinToWatchlist() {
    if (this.currentUser) {
      let watchItem = { CoinId: this.currentCoin.coinId, UserId: this.currentUser.userId };
      this.userService.addCoinToWatchlist(watchItem).subscribe((result) => {
        this.coinInWatchList = true;
      });
    }
  }

  removeCoinFromWatchlist() {
    if (this.currentUser) {
      let watchItem = { CoinId: this.currentCoin.coinId, UserId: this.currentUser.userId };

      this.userService.removeCoinFromWatchlist(watchItem).subscribe((result) => {
        this.coinInWatchList = false;
      });
    }
  }

  showImage(imageIndex: number) {
    if (this.currentCoin.imageUrls[imageIndex] != '')
      this.currentCoinImage = this.currentCoin.imageUrls[imageIndex];
  }

  imageZoomIn() {
    var h = parseInt($("#divZoomOut").css("height").replace("px",""))-40;
    $("#divZoomIn").css("height",h+"px");
      
    $("#divZoomIn").show();
    $("#divZoomOut").hide();
  }

  imageZoomOut() {
    $("#divZoomIn").hide();
    $("#divZoomOut").show();
  }

  sendOffer() {
    if (this.currentCoinOfferPrice > 0) {
      if (this.currentCoinOfferPrice > this.currentCoin.currentPrice) {
        alert("You could click [Buy Now] button when your offer price is more than the current price.");
      } else {
        if (this.currentUser) {
          //send offer
          let coinOffer = { 
            CoinId: this.currentCoin.coinId, 
            CoinName: this.currentCoin.name,
            UserId: this.currentUser.userId, 
            OfferPrice: this.currentCoinOfferPrice,
            OfferStatusCode:'CT'
           };
          this.userService.sendOffer(coinOffer).subscribe((result) => {
            alert("Your offer was sent succeed. Thanks.");

            this.currentCoin.hasOffer = true;
            this.currentCoin.offerPrice = this.currentCoinOfferPrice;
          });
        }
      }
    } else {
      alert("Please input yourr offer price.");
    }
  }

  gotoCompanyCoinList(){
    this.dialogRef.close();
    this.router.navigate(['/CoinList']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    // Your logic here
    this.dialogRef.close();
  }


}
