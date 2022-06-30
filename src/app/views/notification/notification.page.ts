import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  @Input() notificPanel;

  // Dummy notifications
  notifications :any[]=[]
  constructor(private router:Router) { }

  ngOnInit() {
   this.notifications= [{
      message: 'New transaction found',
      icon: 'assignment_ind',
      time: '1 min ago',
      route: '/views/others/dashboard',
      color: 'primary'
    }, {
      message: 'New message',
      icon: 'chat',
      time: '4 min ago',
      route: '/',
      color: 'accent'
    }, {
      message: 'Server rebooted',
      icon: 'settings_backup_restore',
      time: '12 min ago',
      route: '/',
      color: 'warn'
    }]
  }

  previous()
{
  this.router.navigate(['/tabs/profile']);
}

clearAll(e) {
  e.preventDefault();
  this.notifications = [];
}

}
