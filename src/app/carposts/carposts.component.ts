import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';
import * as myGlobals from '../global.apis';
import '../../assets/js/external.js';

declare var myExtObject: any;

@Component({
  selector: 'app-carposts',
  templateUrl: './carposts.component.html',
  styleUrls: ['./carposts.component.css']
})

export class CarpostsComponent implements OnInit {
  resultPost:any = [];
  truePopup:any;
  falsePopup:any;
  btnId:any;
  modalId:any;
  
  constructor(private activatedRoute: ActivatedRoute, public router: Router, public http: Http) { }

  OpenPopup(truePopup, btnId, modalId) {
      myExtObject.func1(truePopup, btnId, modalId);
  }
  ClosePopup(falsePopup, btnId, modalId) {
    myExtObject.func2(falsePopup, btnId, modalId);
  }

  ngOnInit() {
    let postId;
    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        postId = params['postid'];
        console.log(postId);
    });
  }

}
