import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../Models/User/User.model';
import { Coin } from "../Models/Coin/Coin.model"
import { CoinService } from '../Services/coin.service'
import { Router } from '@angular/router';
import { SharedService } from '../Services/shared.service';
import { LocalStorageService } from '../Services/localStorage.service';
import { UserService } from '../Services/user.service';

import { SuccessEvent, RemoveEvent, UploadEvent, UploadModule, FileInfo, UploadComponent, SelectEvent } from '@progress/kendo-angular-upload';

import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-new-coin-page',
  templateUrl: './new-coin-page.component.html',
  styleUrls: ['./new-coin-page.component.scss']
})
export class NewCoinPageComponent implements AfterViewInit {

  //#region variable
  public newCoin: Coin = new Coin();
  startDateTime: Date = moment().add(1, 'day').startOf('day').toDate();
  endDateTime: Date = moment().add(1, 'month').startOf('day').add(1, 'day').add(-1, 'second').toDate();

  userSignedIn: boolean = false;
  currentUser?: User | null;

  public saveUrl = 'https://10.0.0.120/bydwebapi/api/Coin/upload'; //'https://localhost:7084/api/Coin/upload';
  public removeUrl = 'https://demos.telerik.com/kendo-ui/service-v4/upload/remove';
  public imageUrl: string = '';

  public restrictions = { allowedExtensions: ['.jpg', '.png'] };

  public validation = { allowed: true, maxFileSize: 10485760 };

  public value: Date = new Date(2019, 5, 1, 22);
  public format = "MM/dd/yyyy HH:mm";

  carriers = ['', 'Canada Post', 'UPS', 'Fedex', 'DHL', 'USPS', 'Asendia', 'Others'];

  interval = { value: "2", text: "2 days" };
  intervals = [
    { value: "0.25", text: "6 hours" }, { value: "0.5", text: "12 hours" },
    { value: "1", text: "1 day" }, { value: "2", text: "2 days" }, { value: "3", text: "3 days" }, { value: "7", text: "1 week" }];
  //#endregion


  constructor(
    private userService: UserService,
    private coinService: CoinService,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService) {
      
    this.sharedService.UserSignedIn$.subscribe(newValue => { this.userSignedIn = newValue; });
    this.sharedService.CurrentUser$.subscribe(newValue => { this.currentUser = newValue; });

    //this.sharedService.ValidateUserProfile();
    //check local storage to confirm if need user login
    if (this.localStorageService.getData('Token')) {
      //get user profile
      this.userService.getUserProfile().pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.log('Unauthorized access. Redirecting to login page...');
            this.router.navigate(['/Login']);
          }
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
    } else {
      //go to login page
      this.router.navigate(['/Login']);
    };
  }

  ngAfterViewInit() {
    this.setUploaderControl();
  }

  public setUploaderControl() {
    //set upload button
    setTimeout(() => {
      const spans = $("#divImages .k-upload-button-wrap button span.k-button-text");
      $.each(spans, function (index, item) {
        if (item.style.display != 'none') {
          $(item).css("display", "none");
          $("<span class='material-icons byd-add-image-icon' style='font-size: 30px; color: black;'>add</span>").insertAfter($(item));
        }
      });
    }, 100);
  }

  public removeImage(imageIndex: number) {
    this.newCoin.imageUrls[imageIndex] = '';
    this.MaxImagesCount = this.MaxImagesCount + 1;
    this.EmptyImageIndex = this.EmptyImageIndex - 1;

    const elementIamges = $("#divImages img");
    for (let i = imageIndex; i < 5; i++) {
      this.newCoin.imageUrls[i] = this.newCoin.imageUrls[i + 1];
      this.newCoin.imageUrls[i + 1] = '';
    }

    this.setUploaderControl();
  }

  public MaxImagesCount: number = 6;
  public EmptyImageIndex = 0;
  public onSelect(event: any) {
    const files = event.files;
    let filesCount = files.length > this.MaxImagesCount ? this.MaxImagesCount : files.length;

    for (let i = 0; i < filesCount; i++) {

      const file = files[i].rawFile;

      //compress image file content
      const compressImage = async (file: any) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Check if the context is null
            if (!ctx) {
              console.error('Failed to get the canvas context');
              return;
            }

            // Set the canvas dimensions to the desired dimensions
            const maxWidth = 1000;
            const maxHeight = 800;
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convert the canvas to a data URL
            //const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);

            this.newCoin.originalImageUrls[this.EmptyImageIndex + i] = canvas.toDataURL('image/jpeg', 1);

            let compressRatio = 1;
            if (file.size / 1000000 > 10) compressRatio = 0.75;
            this.newCoin.imageUrls[this.EmptyImageIndex + i] = canvas.toDataURL('image/jpeg', compressRatio);
            this.MaxImagesCount = this.MaxImagesCount - 1;
            if (i === files.length - 1)
              this.EmptyImageIndex = this.EmptyImageIndex + filesCount;
          };
        });
      };
      const compressedDataUrl = compressImage(file);
    }
  }

  gotoRouter(routerName: string) { if (routerName == 'CoinList') this.router.navigate(['/' + routerName]); }

  reset() { this.newCoin = new Coin(); }

  //submit
  public submit() {
    if (this.newCoin.name.trim()=='') {
      alert("[Coin Title] was not allowed empty.");
    } else {
      this.newCoin.startDateTime = this.startDateTime;
      this.newCoin.endDateTime = this.endDateTime;
      this.newCoin.interval = this.interval.value;
      this.newCoin.coinOffer = { UserId: 0, CoinId: 0, CoinName: '', OfferPrice: 0, OfferDate: "2023-06-27T10:30:00", OfferStatusCode: "CT" };
      this.newCoin.coinOrder = { OrderStatusCode: "CT" };
      if (this.currentUser) this.newCoin.userId = this.currentUser.userId;
      this.coinService.addNewCoin(this.newCoin).subscribe((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          const result = data;
          alert("Submit succeeded.");
          
          this.newCoin.name="";
          this.newCoin.description="";
          this.newCoin.categoryId="";
          this.newCoin.startPrice=0;
          this.newCoin.lowestPrice=0;
          this.newCoin.increment=0;
          this.newCoin.imageUrls=[];
          
          this.MaxImagesCount = 6;
          this.EmptyImageIndex = 0;
          this.setUploaderControl();
        }
      });
    }
  }

}
