import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { UserOrderComponent } from './user-order/user-order.component'
import { CoinListPageComponent } from './coin-list-page/coin-list-page.component';
import { NewCoinPageComponent } from './new-coin-page/new-coin-page.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SellComponent } from './sell/sell.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'Dashboard', component: DashBoardComponent },
  { path: 'CoinList', component: CoinListPageComponent },
  { path: 'CoinList/:sw', component: CoinListPageComponent },
  { path: 'NewCoin', component: NewCoinPageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'WatchList', component: WatchListComponent},
  { path: 'MyOffer', component: MyOfferComponent},
  { path: 'UserOrder', component: UserOrderComponent},
  { path: 'ResetPassword', component: ResetPasswordComponent},
  { path: 'ResetPassword/:guid', component: ResetPasswordComponent },
  { path: 'Sell', component: SellComponent },
  { path: 'UserProfile', component: UserProfileComponent }
];

const routerOptions: ExtraOptions = {
  urlUpdateStrategy: 'eager',
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
