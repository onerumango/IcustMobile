import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit() {
    // console.log(localStorage.getItem('customer_details'));
    console.log(JSON.parse(localStorage.getItem('customer_details')));
  var customerDetails= JSON.parse(localStorage.getItem('customer_details'))
  console.log(customerDetails);
// this.customerItems=customerDetails;
this.accountType=customerDetails.accountType;
this.accountBalance=customerDetails.custAccount[0].currentBalance;
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
}
