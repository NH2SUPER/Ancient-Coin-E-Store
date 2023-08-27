import { Component } from '@angular/core';
import { User } from '../Models/User/User.model';
import { Coin } from "../Models/Coin/Coin.model";
import { CoinService } from '../Services/coin.service';
import { UserService } from '../Services/user.service';
import { SharedService } from '../Services/shared.service';

import { MatDialog } from '@angular/material/dialog';
import { CoinDetailDialogComponent } from '../coin-detail-dialog/coin-detail-dialog.component';



import * as $ from 'jquery';


@Component({
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.scss']
})
export class MyOfferComponent {

  myCoinOffers?: Coin[];
  userSignedIn: boolean = false;
  currentUser?: User | null;

  constructor(
    private coinService: CoinService,
    private userService: UserService, 
    public dialog: MatDialog, 
    private sharedService: SharedService) 
  {
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });

    this.sharedService.ValidateUserProfile();
  }

  ngOnInit(): void {
    this.getUserOffer();
  }

  getUserOffer(){
    if (this.currentUser)
    this.userService.getUserOffer(this.currentUser.userId).subscribe((data) => {
      this.myCoinOffers = data;
      $("#divSpin").hide();
    });
  }

  acceptOffer(userId:number, coinId:number, coinName:string){
    $("#divSpin").show();
    this.userService.acceptOffer(userId, coinId, coinName).subscribe((data) => {
      this.getUserOffer();
      this.sharedService.ValidateUserProfile();
    });
  }

  openCoinDetail(coin: any): void {
    const dialogRef = this.dialog.open(CoinDetailDialogComponent, {
      width: '80%',
      height: '80%',
      data: { View: coin }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.currentUser)
        this.coinService.getMyWatchList(this.currentUser.userId).subscribe((data) => {
          // this.coins = data;
          // $("#divSpin").hide();
        });
    });
  }
}
