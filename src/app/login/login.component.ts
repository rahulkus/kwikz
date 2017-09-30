import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';
import * as myGlobals from '../global.apis';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  constructor(public router: Router, public http: Http) {
   }

  login(event, email, password) {
    event.preventDefault();
    let body = JSON.stringify({ email, password });
    this.http.post(myGlobals.loginAPIPath, body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().token);
          localStorage.setItem('user', email);
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }

}
