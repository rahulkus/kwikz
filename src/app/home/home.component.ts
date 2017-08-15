import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { FiltersComponent } from '../filters/filters.component';
import { PostblocksComponent } from "../postblocks/postblocks.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }

  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;


  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    //this.decodedJwt = this.jwt && (<any>window).jwt_decode(this.jwt);
  }


}
