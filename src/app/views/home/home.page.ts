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

  constructor(private router:Router) { }

  ngOnInit() {
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
