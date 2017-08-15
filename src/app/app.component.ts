import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public userLoggedIn: boolean;
  username: string;

  constructor(public router: Router) {
    if(localStorage.getItem('id_token')){
      this.userLoggedIn = true;
      this.username = localStorage.getItem('user');
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
