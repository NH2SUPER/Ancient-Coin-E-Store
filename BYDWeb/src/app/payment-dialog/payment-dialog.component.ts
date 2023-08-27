import { Component, ViewChild, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Stripe, StripeCardElement, StripeCardElementOptions, StripeElements, loadStripe } from '@stripe/stripe-js';
import { StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement } from '@stripe/stripe-js';

import { WebApi } from '../Models/System/WebApi.model';

import * as $ from 'jquery';

export interface PaymentDialogComponentData { UserId:number, Amount: number, CoinIds: number[], SubTotal: number, ShippingFee:number, Tax:number }

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements AfterViewInit {

  stripe?: Stripe;

  @ViewChild('cardNumberElement') cardNumberElementRef: ElementRef;
  @ViewChild('cardExpiryElement') cardExpiryElementRef: ElementRef;
  @ViewChild('cardCvcElement') cardCvcElementRef: ElementRef;
  cardNumberElement: StripeCardNumberElement;
  cardExpiryElement: StripeCardExpiryElement;
  cardCvcElement: StripeCardCvcElement;

  paymentAmount: number;
  userId:number=0;
  coinIds:number[]=[];
  subTotal: number=0;
  shippingFee:number=0;
  tax:number=0;
  paymentSucceed:boolean = false;

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogComponentData,
  ) {
    this.paymentAmount = data.Amount;
    this.userId = data.UserId;
    this.coinIds = data.CoinIds;
    
    this.subTotal = data.SubTotal;
    this.shippingFee = data.ShippingFee;
    this.tax = data.Tax;

    this.cardNumberElementRef = elementRef;
    this.cardExpiryElementRef = elementRef;
    this.cardCvcElementRef = elementRef;
    this.cardNumberElement = {} as StripeCardNumberElement;
    this.cardExpiryElement = {} as StripeCardExpiryElement;
    this.cardCvcElement = {} as StripeCardCvcElement;
  }

  async ngOnInit() {
    // this.stripe = await this.initializeStripe();
  }

  async ngAfterViewInit() {
    this.stripe = await this.initializeStripe();
    if (this.stripe) {
      const elements = this.stripe.elements();

      const cardNumberElementOptions: StripeCardElementOptions = {
        style: { base: { fontSize: '16px', color: '#32325d', fontFamily: '"Helvetica Neue", Helvetica, sans-serif', '::placeholder': { color: '#aab7c4' } } }
      };
      this.cardNumberElement = elements.create('cardNumber', cardNumberElementOptions);
      this.cardNumberElement.mount(this.cardNumberElementRef.nativeElement);

      const cardExpiryElementOptions: StripeCardElementOptions = {
        style: { base: { fontSize: '16px', color: '#32325d', fontFamily: '"Helvetica Neue", Helvetica, sans-serif', '::placeholder': { color: '#aab7c4' } } }
      };
      this.cardExpiryElement = elements.create('cardExpiry', cardExpiryElementOptions);
      this.cardExpiryElement.mount(this.cardExpiryElementRef.nativeElement);


      const cardCvcElementOptions: StripeCardElementOptions = {
        style: { base: { fontSize: '16px', color: '#32325d', fontFamily: '"Helvetica Neue", Helvetica, sans-serif', '::placeholder': { color: '#aab7c4' } } }
      };
      this.cardCvcElement = elements.create('cardCvc', cardCvcElementOptions);
      this.cardCvcElement.mount(this.cardCvcElementRef.nativeElement);
    }
  }

  async initializeStripe(): Promise<any> {
    const stripe = await import('@stripe/stripe-js');
    const stripeApiKey = 'pk_test_51NJqgDLgI6S7ZMtJw1VxlxRWyz3oIwfyxb0Osu9E29jZlRYRNPWmOtNXblxqPp60XxyaLnHYA7DxezD8zGodsaap00W6IldHg3';
    return await stripe.loadStripe(stripeApiKey);
  }

  async makePayment() {
    if (this.stripe) {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.cardNumberElement,
        billing_details: { name: 'BYDD Payment' }
      });

      if (error) {
        console.error('Error creating payment method:', error);
        if (error.message) this.showError(error.message); 
      } else {
        this.showMessage("Certificated succeeded, continue processing...");

        // Process the payment with the paymentMethod.id and paymentAmount
        setTimeout(() => { this.processPayment(paymentMethod.id);   }, 50);        
      }
    }
  }

  showError(msg:string){
    $("#spanMessage").hide();
    $("#spanError").show();
    $("#spanError").text(msg);
  }
  showMessage(msg:string){
    $("#spanMessage").show();
    $("#spanError").hide();
    $("#spanMessage").text(msg);
  }

  processPayment(paymentMethodId: string) {
    const paymentData = {
      paymentMethodId: paymentMethodId,
      amount: this.paymentAmount,
      userId: this.userId,
      coinIds: this.coinIds,
      subTotal: this.subTotal,
      shippingFee: this.shippingFee,
      tax: this.tax
    };

    // Send the paymentData to your server for further processing
    const url = WebApi.BYD_API + '/api/Payment';
    this.http.post(url, paymentData).subscribe(
      (response) => {
        $("#spanMessage").hide();
        $("#spanError").hide();
        this.paymentSucceed = true;
      },
      (error) => {
        console.error('Error processing payment:', error);
        if (error.message) this.showError(error.message); 
      }
    );
  }

  closeDialog(): void {
    // Your logic here
    this.dialogRef.close();
  }
}
