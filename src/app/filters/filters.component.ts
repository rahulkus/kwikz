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

  ngOnInit() {
  }

  keywordSearch(event, keyword){
    this.router.navigate(['postblocks'], {queryParams:{searchTerm: keyword}});
  }
}
