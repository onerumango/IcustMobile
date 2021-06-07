import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  title:string='Help';
  isWhatsNew:boolean=false;
  isWhatCanIDo:boolean=false;
  isSecurityTip:boolean=false;
  flag:boolean=true;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToHelp(){
    this.flag=true;
    this.isWhatsNew=false;
    this.isWhatCanIDo=false;
    this.isSecurityTip=false;
  }
  goToWhatsNew(){
    this.flag=false;
    this.isWhatsNew=true;
    this.isWhatCanIDo=false;
    this.isSecurityTip=false;
  }
  goToWhatCanIDo(){
    this.isWhatsNew=false;
    this.flag=false;
    this.isWhatCanIDo=true;
    this.isSecurityTip=false;
  }
  goToSecurityTip(){
    this.flag=false;
    this.isWhatsNew=false;
    this.isWhatCanIDo=false;
    this.isSecurityTip=true;

  }
  goToHome(){
    this.router.navigate(['/tabs/profile']);
  }

}
