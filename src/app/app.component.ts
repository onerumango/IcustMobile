import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataService:DataService) {}

  ngOnInit(): void {
    let avatarUrl = localStorage.getItem('avatarUrl');
    console.log("avatarUrl",avatarUrl);
    if(avatarUrl)
      this.dataService.shareAvatarUrl(avatarUrl);
  }
}
