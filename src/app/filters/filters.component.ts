import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';
import * as myGlobals from '../global.apis';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(public router: Router, public http: Http) {
  }
  
  yearArray = ["2010", '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
  fuelTypeArray = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG', 'Alternative'];  
  maxPriceArray = ['1000$', '2000$', '3000$', '4000$', '5000$', '6000$', '7000$', '8000$', '9000$', '10000$']; 
  
  ngOnInit() {
    
  }

  keywordSearch(event, keyword){
    this.router.navigate(['postblocks'], {queryParams:{searchTerm: keyword}});
  }
}
