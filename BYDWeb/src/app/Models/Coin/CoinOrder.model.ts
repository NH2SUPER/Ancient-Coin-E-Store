export class CoinOrder {
    OrderId: number = 0;
    userId: number = 0;
    coinId: number = 0;
    coinName: string = '';
    OrderStatusCode:string='';
    PurchasePrice:number=0;
    PurchaseDate?:Date;
    Tax:number=0;
    ShippingFee:number=0;
    ServiceFee:number=0;
    Total:number=0;
    CreatedDate?:Date;
    UpdatedDate?:Date;
}