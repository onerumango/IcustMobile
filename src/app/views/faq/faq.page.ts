import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
title:string='FAQ';
isClick:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  showDescription(){
    this.isClick=true;
  }
}
