import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';




class countries {
  public country: string;
  public flag: any;
}



@Component({
  selector: 'app-cashwithdrawal1',
  templateUrl: './cashwithdrawal1.page.html',
  styleUrls: ['./cashwithdrawal1.page.scss'],
})
export class Cashwithdrawal1Page implements OnInit {
  // @ViewChild('upForm') upForm: NgForm;
  slideOneForm: FormGroup;
  constructor(private router:Router,private fb: FormBuilder) { 
   
  }
  transactionAmount="10,000";
  accountBranch="Loita street";
  flag:boolean=true;
 
  nations: countries[]; 
  port: countries; 

  ngOnInit() {
    this.slideOneForm = this.fb.group({
      accountNo:['', [Validators.required]],
      amount:['', [Validators.required]],
      accountBranch:['', [Validators.required]],
      transactionDate:['', [Validators.required]],
      transactionTime:['', [Validators.required]]
    })
     console.log(this.slideOneForm.value);
  }

  countries: any = [ {   code: 'AFG' }]

  // users: User[] = [
  //   {
  //     id: 1,
  //     first: 'Alice',
  //     last: 'Smith',
  //   },
  //   {
  //     id: 2,
  //     first: 'Bob',
  //     last: 'Davis',
  //   },
  //   {
  //     id: 3,
  //     first: 'Charlie',
  //     last: 'Rosenburg',
  //   }
  // ];

  // compareWith(o1: User, o2: User) {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }
  isShow : boolean = false;
  isShown:boolean=false;
  selectedCountryCode = 'us';
  countryCodes = ['us', 'lu', 'de', 'bs', 'br', 'pt'];


  changeSelectedCountryCode(value: string): void {
   // this.selectedCountryCode = value;
  }

  goToLogin(){
    this.router.navigate(['login']);
  }
  goToNextPage(fb){
    this.flag=false;
    console.log(this.slideOneForm.value);
    //this.router.navigate(['cashwithdrawal2']);
  }
  goToPreviousPage(){
    this.flag=true;
  }
  goToNextScreen(){
    this.router.navigate(['cashdeposit']);
  }

}
