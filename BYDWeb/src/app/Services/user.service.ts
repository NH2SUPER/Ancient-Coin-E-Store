import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../Services/localStorage.service';

import { WebApi } from '../Models/System/WebApi.model';

import { User } from "../Models/User/User.model"
import { UserBase } from "../Models/User/UserBase.model"
import { CoinOffer } from '../Models/Coin/CoinOffer.model';
import { CheckOutOrder } from '../Models/User/CheckOutOrder.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    // headers: HttpHeaders;
    http: HttpClient;

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
        this.http = httpClient;
    }

    public addNewUser(newUser: User) {
        const url = WebApi.BYD_API + '/api/User/addNewUser';
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, newUser, httpOptions);
    }

    public checkUserExisted(userEmail:string){
        const url = WebApi.BYD_API + '/api/User/checkUserExisted?userEmail=' + userEmail;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any>(url, httpOptions);
    }

    public signIn(loginUser: UserBase) {
        const url = WebApi.BYD_Token + '/api/Login';
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, loginUser, httpOptions);
    }

    public getUserProfile() {
        const url = WebApi.BYD_API + '/api/User/GetUserProfile';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            })
        };
        return this.http.get<any>(url, httpOptions);
    }

    public updateUserProfile(user: User){
        const url = WebApi.BYD_API + '/api/User/updateUserProfile';
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.localStorageService.getData('Token') }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, user, httpOptions);
    }

    public addCoinToWatchlist(watchItem: any) {
        const url = WebApi.BYD_API + '/api/User/AddCoinToWatchlist';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, watchItem, httpOptions);
    }

    public removeCoinFromWatchlist(watchItem: any) {
        const url = WebApi.BYD_API + '/api/User/RemoveCoinFromWatchlist';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, watchItem, httpOptions);
    }

    public getUserOffer(userId: number) {
        const url = WebApi.BYD_API + '/api/Coin/getUserOffer?userId=' + userId;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            })
        };
        return this.http.get<any>(url, httpOptions);
    }

    public getUserOrders(userId: number) {
        const url = WebApi.BYD_API + '/api/Coin/getUserOrder?userId=' + userId;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            })
        };
        return this.http.get<any>(url, httpOptions);
    }

    public getUserCoins(userId: number) {
        const url = WebApi.BYD_API + '/api/Coin/getUserCoins?userId=' + userId;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            })
        };
        return this.http.get<any>(url, httpOptions);
    }

    public sendOffer(coinOffer: any) {
        const url = WebApi.BYD_API + '/api/User/SendOffer';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, coinOffer, httpOptions);
    }

    public acceptOffer(userId:number, coinId:number, coinName:string){
        const coinOffer = new CoinOffer();
        coinOffer.userId = userId;
        coinOffer.coinId = coinId;
        coinOffer.coinName = coinName;

        const url = WebApi.BYD_API + '/api/Coin/AcceptOffer';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, coinOffer, httpOptions);
    }

    public checkOutOrders(userId:number, orderIds:number[]){
        const checkOutOrder = new CheckOutOrder();
        checkOutOrder.userId = userId;
        checkOutOrder.orderIds = orderIds;

        const url = WebApi.BYD_API + '/api/Coin/CheckOutOrders';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.localStorageService.getData('Token')
            }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, checkOutOrder, httpOptions);
    }

    public forgetPassword(userEmail: string) {
        const url = WebApi.BYD_API + '/api/User/forgetPassword';
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'text' as 'json'
        };
        const param = new UserBase();
        param.Username = userEmail;
        return this.http.post<any>(url, param, httpOptions);
    }

    public changePassword(userNewPassword: any) {
        const url = WebApi.BYD_API + '/api/User/changePassword';
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'text' as 'json'
        };
        return this.http.post<any>(url, userNewPassword, httpOptions);
    }
}
