import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../Services/localStorage.service';

import { WebApi } from '../Models/System/WebApi.model';
import { Coin } from "../Models/Coin/Coin.model"

@Injectable({ providedIn: 'root' })
export class CoinService {

  // headers: HttpHeaders;
  http: HttpClient;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    this.http = httpClient;
  }

  public getNews() {
    const url = WebApi.BYD_API + '/api/Coin/getNews';
    return this.http.get<any>(url);
  }

  public getCoinsInHomePage() {
    const url = WebApi.BYD_API + '/api/Coin/getrefercoins';
    return this.http.get<any>(url);
  }

  public getCompanyCoins(companyId: number) {
    const url = WebApi.BYD_API + '/api/Coin/getCompanyCoins?companyId=' + companyId;
    return this.http.get<any>(url);
  }

  public getCompanyCoinsByPage(coinPara: any) {
    const url = WebApi.BYD_API + '/api/Coin/getCompanyCoinsByPage';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(url, coinPara, httpOptions);
  }

  public getCoinImageById(coinId:number){
    const url = WebApi.BYD_API + '/api/Coin/getCoinImageById?coinId=' + coinId;
    return this.http.get<any>(url);
  }

  public getMyWatchList(userId: number) {
    const url = WebApi.BYD_API + '/api/Coin/getMyWatchList?userId=' + userId;
    return this.http.get<any>(url);
  }

  public addNewCoin(newCoin: Coin) {
    const url = WebApi.BYD_API + '/api/Coin/addNewCoin';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.localStorageService.getData('Token') })};
    return this.http.post<any>(url, newCoin, httpOptions);
  }

  public modifyCoin(newCoin: Coin) {
    const url = WebApi.BYD_API + '/api/Coin/modifyCoin';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(url, newCoin, httpOptions);
  }

  public removeCoin(coinId: number){
    let coin = {CoinId: coinId};
    const url = WebApi.BYD_API + '/api/Coin/removeCoin';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
      })
    };
    return this.http.post<any>(url, coin, httpOptions);
  }
}
