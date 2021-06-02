import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginactivity',
  templateUrl: './loginactivity.page.html',
  styleUrls: ['./loginactivity.page.scss'],
})
export class LoginactivityPage implements OnInit {
title:string='Login Activity';
passwordChangeDate:Date;
  constructor() { }

  ngOnInit() {
  }

}
