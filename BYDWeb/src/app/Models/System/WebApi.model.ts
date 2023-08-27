export class WebApi {
    static API_LOCAL = 'https://localhost:7084';
    static API_DEV = 'http://10.0.0.120/BYDWebApi';
    static API_PROD = 'http://99.255.206.231/bydwebapi';
    static BYD_API = (window.location.href.indexOf("localhost")>-1)? WebApi.API_LOCAL:(window.location.href.toUpperCase().indexOf("10.0.0.120")>-1)?WebApi.API_DEV:WebApi.API_PROD;
  
    static Token_LOCAL = 'https://localhost:7073';
    static Token_DEV = 'http://10.0.0.120/BYDToken';
    static Token_PROD = 'http://99.255.206.231/bydToken';
    static BYD_Token = (window.location.href.indexOf("localhost")>-1)? WebApi.Token_LOCAL:(window.location.href.toUpperCase().indexOf("10.0.0.120")>-1)?WebApi.Token_DEV:WebApi.Token_PROD;
  
    static ENABLE_REQUEST_LOG = false;
  
    // static INVOICE_DATA_COMPANIES = [
    //   {CompanyName:"TACC Construction",CompanyId:"15196"},
    //   {CompanyName:"Pioneer Construction Inc",CompanyId:"11283"},
    //   {CompanyName:"D-K Equipment LTD",CompanyId:"15201"},
    //   {CompanyName:"William Day Construction",CompanyId:"15197"}
    // ];
  
    // static UserToken(): string {
    //   if (localStorage.getItem('ngStorage-CurrentToken')) {
    //     let userToken = localStorage.getItem('ngStorage-CurrentToken');
    //     return userToken.substring(0, userToken.length - 1).substring(1);
    //   }
    //   else {
    //     return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Ik1aaGVuZ0B0b3JvbW9udC5jb20iLCJuYW1laWQiOiIxNmYyYTFiOS05NjgwLTQyMjItYTI1YS0wYjk3YTlhNTMzNjgiLCJVc2VyUmVmS2V5IjoiMTZmMmExYjktOTY4MC00MjIyLWEyNWEtMGI5N2E5YTUzMzY4IiwiJFRva2VuS2V5IjoiNTg0NWJkOTctMzE3NS00Y2M0LTgzOTgtNmQ1MjE1MzA3YTM0IiwiJFVzZXJTaWduSW5Tb3VyY2UiOiIzIiwiaXNzIjoiaHR0cDovL3Rvcm9tb250LmNvbSIsImF1ZCI6IjJhNWNkY2Q5M2E5ZjQ0ODBhOTY1OTEzMzQwMmM4MzZiIiwiZXhwIjoxOTY1NjQ5NjIxLCJuYmYiOjE2NTAyODk2MjF9.QnOOTo3zzvNFnGXE1yoObNAu_7GlzZIjewweGvikC58';
    //   }
    // }
  
    // static CurrentCompany(): Company {
    //   let currentCompany = new Company();
    //   currentCompany.CompanyId = 15196;
    //   if (localStorage.getItem('ngStorage-CurrentCompany')) {
    //     currentCompany = JSON.parse(localStorage.getItem('ngStorage-CurrentCompany'));
    //   }
    //   return currentCompany;
    // }
  }