import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from "@progress/kendo-angular-grid";

import { CarouselModule } from 'ngx-owl-carousel-o';

import { SignalrService } from './signalr.service';

import { HttpClientModule } from '@angular/common/http';

import { HomePageComponent } from './home-page/home-page.component';
import { NewCoinPageComponent } from './new-coin-page/new-coin-page.component';
import { CoinListPageComponent } from './coin-list-page/coin-list-page.component';
import { CoinDetailDialogComponent } from './coin-detail-dialog/coin-detail-dialog.component';
import { DateFormatPipe } from './date-format.pipe';
import { UserRegisterDialogComponent } from './user-register-dialog/user-register-dialog.component';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CoinModifyDialogComponent } from './coin-modify-dialog/coin-modify-dialog.component';
import { SellComponent } from './sell/sell.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewCoinPageComponent,
    CoinListPageComponent,
    CoinDetailDialogComponent,
    DateFormatPipe,
    UserRegisterDialogComponent,
    LoginComponent,
    DashBoardComponent,
    WatchListComponent,
    ResetPasswordComponent,
    MyOfferComponent,
    UserOrderComponent,
    PaymentDialogComponent,
    ConfirmDialogComponent,
    CoinModifyDialogComponent,
    SellComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FlexLayoutModule,

    MatIconModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule, MatBadgeModule, MatSelectModule,

    FormsModule, ReactiveFormsModule, ProgressBarModule, ButtonsModule, InputsModule, LabelModule, UploadModule, DateInputsModule, DropDownListModule, GridModule,

    CarouselModule, HttpClientModule
  ],
  providers: [
    // SignalrService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (signalrService: SignalrService) => () => signalrService.initiateSignalrConnection(),
    //   deps: [SignalrService],
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
