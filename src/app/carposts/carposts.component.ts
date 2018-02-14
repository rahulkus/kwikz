import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';
import * as myGlobals from '../global.apis';

@Component({
  selector: 'app-carposts',
  templateUrl: './carposts.component.html',
  styleUrls: ['./carposts.component.css']
})
export class CarpostsComponent implements OnInit {
  resultPost:any = [];
  
  constructor(private activatedRoute: ActivatedRoute, public router: Router, public http: Http) { }

  ngOnInit() {
    let postId;
    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        postId = params['postid'];
        console.log(postId);
    });
  }

}
