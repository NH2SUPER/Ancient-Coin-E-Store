import { Component } from '@angular/core';

import { Coin } from "../Models/Coin/Coin.model"
import { CoinService } from '../Services/coin.service'
import { SharedService } from '../Services/shared.service';

import { MatDialog } from '@angular/material/dialog';
import { CoinDetailDialogComponent } from '../coin-detail-dialog/coin-detail-dialog.component';

import { User } from '../Models/User/User.model';

import * as $ from 'jquery';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent {

  coins: any;
  userSignedIn: boolean = false;
  currentUser?: User | null;

  constructor(private coinService: CoinService, public dialog: MatDialog, private sharedService: SharedService) {
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });

    this.sharedService.ValidateUserProfile();
  }

  ngOnInit(): void {
    if (this.currentUser)
      this.coinService.getMyWatchList(this.currentUser.userId).subscribe((data) => {
        this.coins = data;
        $("#divSpin").hide();
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
          this.coins = data;
          $("#divSpin").hide();
        });
    });
  }
}
