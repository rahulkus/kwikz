import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';
import * as myGlobals from '../global.apis';

@Component({
  selector: 'app-postblocks',
  templateUrl: './postblocks.component.html',
  styleUrls: ['./postblocks.component.css']
})
export class PostblocksComponent implements OnInit {
  resultPosts:any = [];
  requestedFilters = {'keyword':'', 'make': '', 'model': '', 'year_manufacture': ''};
  
  constructor(private activatedRoute: ActivatedRoute, public router: Router, public http: Http) { }

  ngOnInit() {
        let searchKey, searchMake, searchModel, searchYear;
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            searchKey = params['searchTerm'];
            searchMake = params['searchMake'];
            searchModel = params['searchModel'];
            searchYear = params['searchYear'];
            console.log(searchKey);
          });
          
        this.requestedFilters.keyword = searchKey;
          
        this.http.post(myGlobals.KeywordFilterAPIPath, this.requestedFilters)
          .subscribe(
            response => {
                //if(searchKey === undefined){
                    this.resultPosts = response.json();
                //}
                /*else{
                    for (var i = 0; i < response.json().data.length; i++){
                        if(response.json().data[i].title.indexOf(searchKey) > -1){
                            this.resultPosts.push(response.json().data[i]);
                        }
                    }
                }*/
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
      }
      
  }
