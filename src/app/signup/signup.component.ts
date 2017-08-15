import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
constructor(public router: Router, public http: Http) {
  }

  Signup(event, fname, lname, mobile, email, password) {
    event.preventDefault();
    let body = JSON.stringify({ fname, lname, mobile, email, password });
    this.http.post('http://13.55.117.16/api/auth/signup', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().token);
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }


  ngOnInit() {
  }

}
