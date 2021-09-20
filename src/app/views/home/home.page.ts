import { Component, OnInit } from '@angular/core';
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
  constructor(private router:Router, private api: ApiService) { }

  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber",this.phoneNumber)
 
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
     console.log('backend resp in cash withdrawal', resp);
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
 logOut()
 {
   console.log("this is logout");
   this.router.navigate(["/login"])
 }
}
