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
  currentArray: any;
  image: Object;
  profileData: any;
  constructor(private router:Router, private api: ApiService,  private sanitizer: DomSanitizer,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber",this.phoneNumber)
 
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
     console.log('backend resp in cash withdrawal', resp);
     console.log(resp.customerId);
     this.getProfilePicture(resp.customerId);
     this.savingAccountFun(resp.custAccount);
     this.current = resp.custAccount.filter(res => res.accountType == "current");
       console.log("current",this.current)
       this.currentAssign(this.current);
       this.saving = resp.custAccount.filter(res => res.accountType == "saving");
       console.log("saving",this.saving)
       this.savingAssign(this.saving);
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
 
  getProfilePicture(customerId) {
    const contentType = 'image/png';
    this.api.getProfileDetails(customerId)
      .subscribe((data: any) => {
        this.cdr.markForCheck();
        this.profileData = data;
        if (data.profileImage && data.profileImage.fileData != null) {
          let objectURL = 'data:image/jpeg;base64,' + data.profileImage.fileData;
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL)
        }else{
          this.image="assets/images/personImg.png";
        }
        this.cdr.markForCheck();
      }, (error: any) => {
        console.log(error);
      });
  }

  currentAssign(current) {
   this.currentArray=current;
  }
  savingAssign(saving: any) {
   this.savingArray=saving;
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
 
}
