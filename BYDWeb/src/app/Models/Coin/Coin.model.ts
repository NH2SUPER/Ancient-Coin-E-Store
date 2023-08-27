export class Coin {
    coinId: number = 0;
    CoinNumber: string = '';
    name: string = '';
    description: string='';
    CountryCode: string = '';
    Country: string = '';
    TypeId: number = 0;
    categoryId: string = '';
    CompositionId: number = 0;
    CompositionPercent: number = 0;
    FaceValue:string = '';
    Year: number = 0;
    CertificationId: string = '';
    Weight: number = 0;
    Diameter: number = 0;
    Condition: string = '';
    MintDate: Date = new Date();

    startPrice:number=0;
    CurrentPrice:number=0;
    interval:string='';
    intervalString:string='';
    increment:number=0;
    NextUpdateDateTime?:Date;
    lowestPrice:number=0;
    currentPrice:number=0;
    startDateTime?:Date;
    endDateTime?:Date;
    LeftTime:string='';
    shippingModeId: number=0;

    carrierNameDomestic:string='';
    serviceTypeDomestic:string='';
    shippingFeeDomestic:number=0;
    carrierNameInternational:string='';
    serviceTypeInternational:string='';
    shippingFeeInternational:number=0;

    originalImageUrls:string[] = ['','','','','',''];
    imageUrls:string[] = ['','','','','',''];

    IsAvialable: boolean = true;
    enteredUserId: number = 0;
    enteredDate: Date = new Date();
    UpdatedUserId: number = 0;
    UpdatedDate: Date = new Date();
    IsCirculated: boolean = true;

    coinOffer:any;
    coinOrder:any;

    userId:number=0;
    coinStatus:string='';
    IfShipped:boolean=false;
}