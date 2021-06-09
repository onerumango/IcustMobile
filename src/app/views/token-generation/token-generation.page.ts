import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.page.html',
  styleUrls: ['./token-generation.page.scss'],
})
export class TokenGenerationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
next()
{
  this.router.navigate(['tabs']);
}
}
