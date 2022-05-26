import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

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
  image: any;
  profileData: any;
  formData: any;
  loan: any;
  curr: string;
  currLoan: string;
  currCurrent: string;
  selectedAccountNumber: any;
  cards:any = [];
  constructor(private router:Router, private api: ApiService,  private sanitizer: DomSanitizer,
    private cdr:ChangeDetectorRef, private dataService: DataService, 
    public modalController: ModalController) { }

  ngOnInit() {

     this.phoneNumber = localStorage.getItem('PhoneNumLogin');
     this.firstName = localStorage.getItem('firstName');
     var customerDetails= JSON.parse(localStorage.getItem('customer_details'));
     this.accountType=customerDetails.accountType;
     this.loadCustomerDetails();

     this.dataService.getAvatarUrl.subscribe(data =>{
      if(data != null){
        this.image = data;
        this.cdr.markForCheck();
        console.log(this.image);
      }
    });
  }


  loadCustomerDetails(){
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
     console.log('backend resp in cash withdrawal', resp);
     this.formData=resp;
     this.cards = resp.custAccount;
     localStorage.setItem('loginRespAccountId',this.cards[0].accountId);

     this.dataService.shareAccountInfo(this.cards[0]);
     this.getProfilePicture(resp.customerId);
     this.cdr.markForCheck();
	  //  this.currLoan = getCurrencySymbol(this.loan[0].accountCurrency, "narrow");
    },(err:any) =>{
       console.log("Err", err);
    })
  }
  
 
  getProfilePicture(customerId) {
    const contentType = 'image/png';
    this.api.getProfileDetails(customerId)
      .subscribe((data: any) => {
        this.cdr.markForCheck();
        this.profileData = data;
        console.log(" profile Image",this.profileData.profileImage.fileUrl);
        if (data.profileImage != null) {
          let objectURL =  data.profileImage;
          this.image = data.profileImage != "not_available" ? this.sanitizer.bypassSecurityTrustUrl(objectURL) : undefined;
        }else{
          this.image = null;
        }
        this.cdr.markForCheck();
      }, (error: any) => {
        console.log(error);
      });
  }

  
 async searchModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
    });
    return await modal.present();
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


 getAccountNumber(info){
  this.dataService.shareAccountInfo(info);
  this.router.navigate(['/tabs/transaction']);
 }

 goToProfile(){
  this.router.navigate(['/tabs/profile']);
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


}
