import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
};
accountType:string;
accountBalance:string;
  firstName: string;
  phoneNumber: string;
  users: any;
  savingAccount: any;
  current: any;
  saving: any;
  savingArray: any[]=[];
  currentArray: any[]=[];
  image: Object;
  profileData: any;
  formData: any;
  loan: any;
  loanArray: any[]=[];
  curr: string;
  currLoan: string;
  currCurrent: string;
  constructor(private router:Router, private api: ApiService,  private sanitizer: DomSanitizer,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber",this.phoneNumber)
 
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
     console.log('backend resp in cash withdrawal', resp);
     console.log(resp.customerId);
     this.formData=resp;
     this.getProfilePicture(resp.customerId);
    //  this.savingAccountFun(resp.custAccount);
     this.current = resp.custAccount.filter(res => res.accountType == "current" );
       console.log("current",this.current)
       if(this.current.length>0){
       this.currentAssign(this.current);
       }
       this.saving = resp.custAccount.filter(res => res.accountType == "saving");
       console.log("saving",this.saving)
       if(this.saving.length>0){
       this.savingAssign(this.saving);
       }
       this.loan = resp.custAccount.filter(res => res.accountType == "loan");
       console.log("loan",this.loan)
       if(this.loan.length>0){
       this.loanAssign(this.loan);
       }
    })
 
    this.firstName=localStorage.getItem('firstName');
    // console.log(localStorage.getItem('customer_details'));
    console.log(JSON.parse(localStorage.getItem('customer_details')));
  var customerDetails= JSON.parse(localStorage.getItem('customer_details'))
  console.log(customerDetails);
// this.customerItems=customerDetails;
this.accountType=customerDetails.accountType;
// this.accountBalance=customerDetails.custAccount[0].currentBalance;
  }
  loanAssign(loan: any) {
   if(loan!=undefined){
    this.loanArray=loan;
    this.currLoan = getCurrencySymbol(loan[0].accountCurrency, "narrow");
 console.log(this.currLoan);
   }
  }
 
  getProfilePicture(customerId) {
    const contentType = 'image/png';
    this.api.getProfileDetails(customerId)
      .subscribe((data: any) => {
        this.cdr.markForCheck();
        this.profileData = data;
        console.log(" profile Image",this.profileData.profileImage.fileUrl);
        if (data.profileImage && data.profileImage.fileUrl != null) {
         // let objectURL = 'data:image/jpeg;base64,' + data.profileImage.fileName;
          let objectURL =  data.profileImage.fileUrl;
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }else{
          this.image=null;
        }
        this.cdr.markForCheck();
      }, (error: any) => {
        console.log(error);
      });
  }

  
  getRandomColor(idx) {
    var col0 = '#0d856b';
    var col1 = '#d66f1b';
    var col2 = '#9f52e7';
    var col3 = '#e9318d';
    var col4 = '#1175a3';
    var col5 = '#e93131';
    var col6 = '#2316d3';
    var col7 = '#f557f5';
    var col8 = '#d6c31b';
    var col9 = '#40d61b';

    if ((idx % 10) == 0) return col0;
    if ((idx % 10) == 1) return col1;
    if ((idx % 10) == 2) return col2;
    if ((idx % 10) == 3) return col3;
    if ((idx % 10) == 4) return col4;
    if ((idx % 10) == 5) return col5;
    if ((idx % 10) == 6) return col6;
    if ((idx % 10) == 7) return col7;
    if ((idx % 10) == 8) return col8;
    if ((idx % 10) == 9) return col9;
    return '#d86315';
    // var randomColor = Math.floor(Math.random()*16777215).toString(16);
    // return '#' + randomColor.slice(-6);
    // var randomColor = Math.floor(0x1000000 * Math.random()).toString(16);
    // return '#' + ('000000' + randomColor).slice(-6);
  }

  currentAssign(current) {
 console.log(current)
   this.currentArray=current;
   this.currCurrent = getCurrencySymbol(current[0].accountCurrency, "narrow");
 console.log(this.currCurrent);
    
  }
  savingAssign(saving: any) {
    
    if(saving!=undefined){

   this.savingArray=saving;
   this.curr = getCurrencySymbol(saving[0].accountCurrency, "narrow");
 console.log(this.curr);
    }
  }
  goToCashWithdrawal(){
    this.router.navigate(['cashwithdrawal']);
  }
  goToCashDeposit(){
    this.router.navigate(['cashdeposit']);
  }
  goToChequeDeposit(){
    this.router.navigate(['chequedeposit']);
  }
  goToChequeWithdrawal(){
    this.router.navigate(['chequewithdrawal']);
  }
  goToForexTransaction(){
    this.router.navigate(['forex-transaction']);
  }
  goToLoanPayment(){
    this.router.navigate(['loan-payment']);
  }
  goToUtilityPayment(){
    this.router.navigate(['utility-payment']);
  }
  goToDepositTopUp(){
    this.router.navigate(['deposit-topup']);
  }
  savingAccountFun(filteredResponseSavingAccount)
  {

 console.log(filteredResponseSavingAccount)
 this.users = filteredResponseSavingAccount.map(a => a.accountId);
 console.log("savingAccount",this.savingAccount);
 

 }

  logOut() {
    console.log("this is logout");
    this.router.navigate(["/login"]);
    localStorage.removeItem('PhoneNumLogin');
    sessionStorage.removeItem('customer_id');
  }
}
