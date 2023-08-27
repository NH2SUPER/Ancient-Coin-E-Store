import { Component } from '@angular/core';

import { User } from '../Models/User/User.model';
import { Coin } from "../Models/Coin/Coin.model";
import { CoinService } from '../Services/coin.service';
import { UserService } from '../Services/user.service';
import { DialogService } from '../Services/dialog.service';
import { SharedService } from '../Services/shared.service';

import { MatDialog } from '@angular/material/dialog';
import { CoinDetailDialogComponent } from '../coin-detail-dialog/coin-detail-dialog.component';
import { CoinModifyDialogComponent } from '../coin-modify-dialog/coin-modify-dialog.component';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {

  userSellSummary: any;
  userSignedIn: boolean = false;
  currentUser?: User | null;
  userAllCoins:Coin[]=[];
  userSoldCoins:Coin[]=[];
  userWaitShippingCoins:Coin[]=[];
  userCoins:Coin[]=[];

  totalCount:number=0;
  soldCount:number=0;
  waitingCount:number=0;

  constructor(private coinService: CoinService, private userService: UserService, private dialogService: DialogService, public dialog: MatDialog, 
    private sharedService: SharedService)  {
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });

    this.sharedService.ValidateUserProfile();
  }

  ngOnInit(): void {
    this.getUserCoins();
  }

  getUserCoins(){
    if (this.currentUser)
    this.userService.getUserCoins(this.currentUser.userId).subscribe((data) => {
      _.each(data, (c)=>c.enteredDate=moment(c.enteredDate).format('YYYY-MM-D, h:mm:ss a'));

      this.userAllCoins = data;
      this.userCoins = _.cloneDeep(data);

      this.totalCount = this.userCoins.length;
      
      this.userSoldCoins = _.filter(this.userCoins, (uc)=>uc.coinStatus=="CT");
      this.soldCount = this.userSoldCoins.length;

      this.userWaitShippingCoins = _.filter(this.userCoins, (uc)=>uc.coinStatus=="PD");
      this.waitingCount = this.userWaitShippingCoins.length;

      $("#divSpin").hide();
    });
  }

  loadSellCoins(loadBy:number){
    if (loadBy==0)
      this.userCoins = _.cloneDeep(this.userAllCoins);
    if (loadBy==1)
      this.userCoins = _.cloneDeep(this.userSoldCoins);
     if (loadBy==2)
      this.userCoins = _.cloneDeep(this.userWaitShippingCoins);
  }
}
