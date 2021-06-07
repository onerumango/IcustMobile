import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
forwardarrow:boolean=true;
downarrow:boolean=false;
faqDesc: string;
slno:number = 0;
  constructor(private router:Router) { }
List:List[]=[
  {
    sno:1,
    title:'How can I access/use/utilize the amount credited to my overdraft account ?',
    description:'The overdraft account will be like any other transaction account with a limit up to which you can utilize the amount. The amount in the account can be transferred using this platform.'
  },
  {
    sno:2,
    title:'Can I use same account for accessing multiple accounts ?',
    description:'Yes you can use same account for accessing multiple accounts.'
  },
  {
    sno:3,
    title:'How can I pay my utility bill payment service through this app ?',
    description:'Yes you can pay your utility bill payment service through this app.'
  },
 
]
  ngOnInit() {
  }
  rotateforwardarrow(item: any){
    console.log(item);
    this.faqDesc = item.description;
    this.slno = item.sno;
    this.forwardarrow=false;
    this.downarrow=true;

  }
rotatedownarrow(item: any){
  console.log(item);
  this.faqDesc = item.description;
  this.slno = item.sno;
  this.forwardarrow=true;
  this.downarrow=false;
}
goToHome(){
  this.router.navigate(['/tabs/profile']);
}
}

interface List{
  sno:number,
  title:string;
  description:string;
}