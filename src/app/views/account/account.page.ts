import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  flag: boolean;
  private subscriptionName: Subscription; 
  formData: any;
  phoneNumber: string;
  users: any[];
  option=new Option();
  userAddress: any;
  address: any;
  kycVerificationForm: FormGroup;
  communicationAdress: string;

  constructor(public popoverCtrl: PopoverController,
    public router:Router,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private commonService:CommonserviceService,private api: ApiService, private cdr:ChangeDetectorRef) {
      this.kycVerificationForm = this.fb.group({
        firstName: [null, [Validators.required, Validators.minLength(5)]],
        lastName: [null, [Validators.required, Validators.minLength(5)]],
      //   dob: [null, [Validators.required]],
      //   email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      //   password: [null, [Validators.required, Validators.minLength(6)]],
      //   confirmPassword: [null, [Validators.required]],
      }); 
    }

  ngOnInit() {
    this.kycVerificationForm = this.fb.group({
    
      prefix: [""],
      // firstName: ['',[Validators.required]],
      primaryEmailAdress: ["",[ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      firstName: [""],
      lastName: [""],
      middleName: [""],
      customer_id: [""], //we need to add customerid dynamically based on Post and Put method --->added by jaya
      panNumber:[""],
      accountId:[""],
      communicationAddress: this.fb.group({
        addressType: ["communication"],
        address1: [""],
        address2: [""],
        city: [""],
        zipCode: [""],
        country: [""],
      }),
    });
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
  this.getAccDetails();

  }

  getAccDetails(){
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in account', resp);
      console.log(resp.userAddress[0])
      this.assignAddress(resp.userAddress[0],resp)
       this.address=resp.userAddress[0];
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      this.savingAccountFun(resp.custAccount);
      this.formData=resp;
      console.log(this.formData);

      
     })

  }
  assignAddress(address,form) {
    console.log(form);
   this.communicationAdress=address.address1+" "+address.address2+" "+address.city+" "+address.zipCode+" "+address.country;
   console.log(this.communicationAdress)
   this.option.address=this.communicationAdress;
   this.kycVerificationForm.get('primaryEmailAdress').setValue(form.primaryEmailAdress);
   this.kycVerificationForm.get('phoneNumber').setValue(form.phoneNumber);
   this.kycVerificationForm.get('firstName').setValue(form.firstName);
   this.kycVerificationForm.get('panNumber').setValue(form.panNumber);
   this.kycVerificationForm.get('communicationAddress').setValue({
    addressType: "communication",
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    zipCode: address.zipCode,
    country: address.country
});
//   this.kycVerificationForm.controls.communicationAddress.setValue({
//     addressType: "communication",
//     address1: address.address1,
//     address2: address.address2,
//     city: address.city,
//     zipCode: address.zipCode,
//     country: address.country
// });
  }
  onSubmitTemplateBased() {
    console.log(this.kycVerificationForm);
}

  
  setCustVerificationValues(data) {
    this.kycVerificationForm.patchValue(data.customerInfoList[0]);
    if (data.userAddress.length == 2) {
      console.log("if");
      // this.kycVerificationForm.addControl("permanentAddress", this.permanentAddress);
      // this.kycVerificationForm.get("isAddressSame").patchValue(this.array[1].name);
      this.kycVerificationForm.get("communicationAddress").patchValue(data.customerInfoList[0].userAddress[0]);
      // this.kycVerificationForm.get("permanentAddress").patchValue(data.customerInfoList[0].userAddress[1]);
    } else {
      console.log("Else");
      this.kycVerificationForm.get("communicationAddress").patchValue(data.customerInfoList[0].userAddress[0]);
    }
  }
  savingAccountFun(filteredResponseSavingAccount: any) {
  
    this.users = filteredResponseSavingAccount.map(a => a.accountId);
   this.option.defaultId = this.users ? this.users[0] : null;
    console.log( this.option.defaultId )
    // this.formData.controls.accountNumber.setValue(defaultId);
  }
  saveAccount(data){
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in account', resp);
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      this.formData=resp;
      console.log(this.formData);

     })
    let userAddress : any[] = [];
    userAddress.push(this.kycVerificationForm.value.communicationAddress);
    let payload = {
      // prefix: this.kycVerificationForm.value.prefix,
      primaryEmailAdress: this.kycVerificationForm.value.primaryEmailAdress,
      phoneNumber: this.kycVerificationForm.value.phoneNumber,
      firstName: this.kycVerificationForm.value.firstName,
      // firstName: this.formData.firstName,
      lastName: this.kycVerificationForm.value.lastName,
      // middleName: this.kycVerificationForm.value.middleName,
      customer_id: this.kycVerificationForm.value.customer_id,
      // nationality: this.kycVerificationForm.value.nationality,
      userAddress: userAddress,
    };
    console.log(payload);
    console.log(data);
    this.api.saveAccount(data).subscribe((resp) => {
      console.log('backend resp in account', resp);
     })
this.previous1();

  }
  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create();
  //   popover.present({
  //     ev: myEvent
  //   });
  // }
  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      // subHeader: 'Subtitle',
      animated: false,
      backdropDismiss: false,
      cssClass:'my-custom-class',
      mode: 'ios',
      buttons: [ {
        text: 'Edit',
        // icon: 'share',
        handler: () => {
         this.edit();
          console.log('Share clicked');
        }
      }, {
        text: 'Share  Account Details',
        // icon: 'arrow-dropright-circle',
        handler: () => {
     
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  edit()
  {
    this.flag=true;
  }
  test(){
    console.log("eneter inside save method")
  }
  previous()
  {
    this.router.navigate(['/tabs/profile']);
  }
  previous1()
  {
    // this.router.navigate(['account']);
    this.flag=false;
  }
}
export class Option{
defaultId:any;
address:any;
}
