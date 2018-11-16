import { Component, OnInit } from '@angular/core';
import { User } from '../objects/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user: User;

  constructor(public auth: AuthService, private router: Router) {
  //  this.user = auth.getUser();
   }

  //  logout() {
  //   this.auth.logout();
  //   this.router.navigateByUrl('login');
  // }

  ngOnInit() {
  }

}
