import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers.component';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import * as myGlobals from '../global.apis';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {StripeCheckoutLoader, StripeCheckoutHandler} from 'ng-stripe-checkout';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SellComponent implements OnInit {
  private stripeCheckoutHandler: StripeCheckoutHandler;
  constructor(public router: Router, public http: Http,private stripeCheckoutLoader: StripeCheckoutLoader) {
    
  }
  postmodel = {'category_id':'1', 'location': 'New Zealand', 'near_offer': '1', 'main_category': 'cars', 'amount': 10, 'title': '', 'make': '', 'model':'', 'year_manufacture':'', 'abs_brakes':0, 'alarm':0, 'central_locking':0, 'passenger_airbag':0, 'sunroof': 0, 'air_conditioning':0, 'alloy_wheels':0, 'driver_airbag':0, 'power_steering':0, 'towbar':0};
  updatemodel = {'id':'', 'near_offer': '1', 'is_classified': '1', 'amount': 45, 'listing_duration_fixed_length':'', 'onroad_costexcluded':''};
  selectedArray:any = [];
  place:string = 'Model';
  isRadioSelected:boolean = false;
  showDNClass: boolean = true;
  toTrue: boolean = false;
  showPhotoClass = false;
  showDetailsClass = false;
  displayCarDetails = 'block';
  displayListingDetails = 'none';
  displayPhotoDetails = 'none';
  displayFinalDetails = 'none';

  bodyTypeArray = ["Don't Know", 'Convertible', 'Coupe', 'Hatchback', 'Sedan', 'Station Wagon', 'RV/SUV', 'Ute', 'Van'];
  fuelTypeArray = ["Don't Know", 'Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG', 'Alternative'];
  cylindersArray = ["Don't Know", 'Rotary', '4 Cylinder', '5 Cylinder', '6 Cylinder', '8 Cylinder', '10 Cylinder', '12 Cylinder'];
  transmissionArray = ["Don't Know", 'Manual', 'Automatic', 'Tiptronic'];
  noOfOwnersArray = ["Don't Know", 'New', '1 Owner', '2 Owners', '3 Owners', '4 Owners', '5+ Owners'];
  importHistoryArray = ["Don't Know", 'Imported', 'NZ New'];
  registrationExpireArray = ["Don't Know", 'No Registration', 'May-17', 'Jun-17', 'Jul-17', 'Aug-17', 'Sep-17', 'Oct-17', 'Nov-17', 'Dec-17',
                             'Jan-18', 'Feb-18', 'Mar-18', 'Apr-18', 'May-18'];
  WoFArray = ["Don't Know", 'No Registration', 'May-17', 'Jun-17', 'Jul-17', 'Aug-17', 'Sep-17', 'Oct-17', 'Nov-17', 'Dec-17',
                             'Jan-18', 'Feb-18', 'Mar-18', 'Apr-18', 'May-18'];
  approxValueArray = ['$1,000', '$2,000', '$3,000', '$4,000', '$5,000', '$6,000', '$7,000', '$8,000', '$9,000', '$10,000', '$12,500', '$15,000'];
  fixedLengthArray = ['7 days', '14 days'];
  bestContactArray = ['Any Time', 'Morning', 'Afternoon', 'Evening', 'Business Hours'];

carMakeArray = ['Alfa romeo', 'Aston martin', 'Audi', 'Austin', 'Bentley' , 'BMW', 'Cadillac' , 'Chery', 'Chevrolet' , 'Chrysler',
   'Citroen', 'Daewoo', 'Daihatsu' , 'Daimler', 'Dodge' , 'Ferrari', 'Fiat', 'Ford', 'Foton', 'Geely', 'GMC', 'Great Wall', 'Holden' ,
   'Honda', 'Hummer' , 'Hyundai', 'Isuzu' , 'Iveco', 'Jaguar' , 'Jeep', 'Kia' , 'Lamborghini', 'Land Rover' , 'LDV', 'Lexus' , 'Lotus' ,
   'Mahindra', 'Maserati', 'Mazda' , 'McLaren', 'Mercedes-Benz' , 'MG', 'Mini' , 'Mitsubishi', 'Morgan' , 'Morris', 'Nissan' , 'Opel',
   'Peugeot' , 'Pontiac', 'Porsche', 'Renault', 'Riley' , 'Rolls-Royce', 'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'Ssangyong', 'Subaru',
   'Suzuki', 'Toyota', 'Triumph', 'TVR', 'Vauxhall', 'Volkswagen', 'Volvo', 'Other'
];

AlfaRomeo = ['146', '147', '155', '156', '159', '166', '33', '4c', '75', 'Giulietta', 'GT', 'GTV', 'MiTo', 'Spider', 'Sprint', 'Other'];
AstonMartin = ['DB7', 'DB9', 'DBS', 'Rapide', 'V8 Vantage', 'Vanquish', 'Vantage', 'Virage'];
Audi = ['100', '80', '90', '90E', 'A1', 'A3', 'A4', 'A5A', 'A6', 'A7', 'A8', 'Allroad', 'Avant', 'Q3', 'Q5', 'Q7', 'R8', 'RS3', 'RS4',
        'RS5', 'RS6', 'RS7', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'TT'];
Austin = ['10', '1100', '1300', '41804', '7', '850', 'A40', 'A90', 'Allegro', 'Ascot', 'Austin 10', 'Clubmin', 'Gipsy', 'Healey', 'Mini',
          'Princes HL', 'Ruby', 'Sheerline', 'Special', 'Ten', 'Wolseley'];
Bentley = ['3lt Special', 'BenTurbo RL', 'Continental', 'Flying Spur', 'Mulsanne', 'R-Type'];
BMW = ['116i', '118d', '118i', '120d', '120i', '123d', '125i', '130i', '135i', '220i', '228i', '235i', '3', '316', '316i', '316ti', '318',
       '318ci', '318d', '318i', '318is', '318ti', '318ci', '320d', '320i', '323', '323i', '325ci', '325d', '325i', '328', '328ci', '328i',
       '330', '330ci', '330d', '330i', '335ci', '428i', '435i', '520d', '520i', '523', '523i', '525', '525d', '525i', '528i', '530', '530d',
       '530i', '535', '535d', '535i', '540', '540i', '545i', '550i', '630i', '640d', '645ci', '650i', '728i', '730d', '730i', '730LD',
       '735', '735i', '740', '740i', '740il', '745i', '745iL', '745Li', '760LI', 'Compact', 'i3', 'i8', 'M', 'M3', 'M5', 'M6', 'Mini',
       'Mini Cooper', 'X1', 'X3', 'X4', 'X5', 'X6', 'Z3', 'Z4'];
Cadillac = ['ATS', 'CTS', 'Deville', 'ELR', 'Escalade', 'Fleetwood', 'SRX', 'XTS'];
Chery = ['J1', 'J11', 'J3'];
Chevrolet = ['210', '56', 'Belair', 'Blazer', 'c1500', 'c20', 'Camaro', 'Caprice', 'Cheyenne', 'Corvette', 'Coupe', 'Cruise', 'Cruze', 'El Camino',
             'Electra', 'Flatback', 'Fleetmaster', 'Impala', 'Master', 'MW', 'MWG', 'Oldsmobile', 'Optra', 'Pickup', 'Roadster', 'Silverado',
             'Sonic', 'SS', 'Starcraft', 'Suburban', 'Superior', 'Tahoe'];
Chrysler = ['300', '300 SRT', '300C', '52', '62', 'Avenger', 'Crossfire', 'FURY COUPE', 'G70', 'Grand Voyager','Hillman', 'Jeep', 'Jeep Grand Cherokee',
            'Neon', 'New Yorker','PT Cruiser', 'Sebring', 'Valiant', 'Voyager', 'Windsor'];
Citroen = ['Aircross', 'Berlingo', 'BX', 'C2', 'C3', 'C4', 'C5', 'Cx', 'CX2200', 'DS23', 'DS3', 'DS4', 'DS5', 'Evasion', 'Light 15', 'Saxo', 'Xantia',
           'Xsara', 'ZX'];
Daewoo = ['Cielo', 'Espero', 'Kalos', 'Lacetti', 'Lanos', 'Leganza', 'Matiz', 'Nubira', 'Tacuma'];
Daihatsu = ['Applause', 'Atrai', 'Bego', 'Boon', 'Charade', 'Coo', 'Copen', 'Delta', 'Feroza', 'Materia', 'Mira', 'Move', 'Pyzar', 'Rocky', 'Rugger',
            'Sirion', 'Storia', 'Terios', 'YRV'];
Daimler = ['Sovereign'];
Dodge = ['Aspen', 'Avenger', 'Caliber', 'Challenger', 'Charger', 'DU', 'Journey', 'Nitro', 'Pioneer' ,'Ram' ,'RAM1500', 'Viper'];
Ferrari = ['328', '348', '360', '456', '458 Italia', '599', '612', 'California', 'F355', 'F430', 'FF', 'Spider'];
Fiat = ['128 Sport', '500', '850', 'Abarth', 'Brava', 'Bravo', 'Doblo', 'Ducato', 'Grande Punto', 'Lancia Beta', 'Multipla', 'Panda', 'Punto', 'Scudo', 'Stilo'];
Ford = ['Anglia', 'Bronco', 'Capri', 'Cortina', 'Courier', 'Deluxe', 'Econovan', 'Ecosport', 'Escape', 'Escort', 'Explorer', 'F150', 'F250', 'F350', 'Fairlane',
        'Fairmont', 'Falcon','Festiva', 'Fiesta', 'Focus', 'FPV', 'G6E', 'Ixion', 'Ka', 'Kuga', 'Laser', 'LTD', 'Mercury', 'Mondeo', 'Mustang', 'Probe', 'Ranger',
        'Roadster', 'Sierra', 'Spectron', 'Standard', 'Taurus', 'Telstar', 'Territory', 'Thunderbird', 'Tourneo', 'Transit', 'Typhoon', 'XLT'];

  valueChanged(newVal) {
    if(newVal === 'Austin'){ this.setValues(); this.selectedArray = this.Austin; }
    else if(newVal === 'Audi'){ this.setValues(); this.selectedArray = this.Audi; }
    else{ this.setValues(); }
  }

  public setValues(){
      console.log(this.selectedArray);
      this.place = 'Model';
  }

  clearInput(st: HTMLInputElement){
    st.value = null;
  }

  onRadioSelect(){
   this.isRadioSelected = true;
  }

  ngOnInit() {
    this.stripeCheckoutLoader.createHandler({
            key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
            token: (token) => {
                // Do something with the token...
                console.log('Payment successful!', token);
            }
        }).then((handler: StripeCheckoutHandler) => {
            this.stripeCheckoutHandler = handler;
        });
  }

    onClickBuy() {
        this.stripeCheckoutHandler.open({
            amount: 1500,
            currency: 'EUR',
        });
    }
    
    public onClickCancel() {
        // If the window has been opened, this is how you can close it:
        this.stripeCheckoutHandler.close();
    }
 
  onClickChangeTab(e: HTMLInputElement){
    console.log(e.id);
  }

  setVariables(selectedTab: string){
    if(selectedTab == 'carDetailsTab'){
      this.showDNClass = true;
 
      this.toTrue = false;
      this.showPhotoClass = false;
      this.showDetailsClass = false;
    }
    if(selectedTab == 'listingDetailsTab'){
      this.toTrue = true;
      this.showPhotoClass = false;

      this.showDNClass = false;
      this.showDetailsClass = false;
    }
    if(selectedTab == 'showPhotosTab'){
      this.toTrue = false;
      this.showPhotoClass = true;
      this.showDNClass = false;
      this.showDetailsClass = false;
    }
    if(selectedTab == 'detailsConfirmationTab'){
      this.toTrue = false;
      this.showPhotoClass = false;
      this.showDNClass = false;
      this.showDetailsClass = true;
    }
  }

  onClickChangeT(clickedBtn: string){
    if(clickedBtn == 'prevCarDetailsbtn'){
        
        this.displayCarDetails = 'block';
        this.displayListingDetails = 'none';
        this.displayPhotoDetails = 'none';
        this.displayFinalDetails = 'none';
        this.showDNClass = true;
        this.toTrue = false;
        this.showPhotoClass = false;
        this.showDetailsClass = false;
      }
    if(clickedBtn == 'nxtCarDetailsbtn'){
      
      this.displayCarDetails = 'none';
      this.displayListingDetails = 'block';
      this.displayPhotoDetails = 'none';
      this.displayFinalDetails = 'none';
      this.showDNClass = true;
      this.toTrue = true;
      this.showPhotoClass = false;
      this.showDetailsClass = false;
      this.createPost();
    }
    if(clickedBtn == 'prevCarListingbtn'){
        
        
        this.displayCarDetails = 'none';
        this.displayListingDetails = 'block';
        this.displayPhotoDetails = 'none';
        this.displayFinalDetails = 'none';
        this.showDNClass = true;
        this.toTrue = true;
        this.showPhotoClass = false;
        this.showDetailsClass = false;              
      }    
    if(clickedBtn == 'nxtCarListingbtn'){

      
      
      this.displayCarDetails = 'none';
      this.displayListingDetails = 'none';
      this.displayPhotoDetails = 'block';
      this.displayFinalDetails = 'none';
      this.showDNClass = true;
      this.toTrue = true;
      this.showPhotoClass = true;
      this.showDetailsClass = false;            
      this.updatePost();
    }
    if(clickedBtn == 'prevCarPhotosbtn'){
        
        this.displayCarDetails = 'none';
        this.displayListingDetails = 'none';
        this.displayPhotoDetails = 'block';
        this.displayFinalDetails = 'none';
        this.showDNClass = true;
        this.toTrue = true;
        this.showPhotoClass = true;
        this.showDetailsClass = false;         
      }    
    if(clickedBtn == 'nxtPhotosbtn'){
      
      this.displayCarDetails = 'none';
      this.displayListingDetails = 'none';
      this.displayPhotoDetails = 'none';
      this.displayFinalDetails = 'block';
      this.showDNClass = true;
      this.toTrue = true;
      this.showPhotoClass = true;
      this.showDetailsClass = true;         
    }
  }

  Post(event, plate) {
    event.preventDefault();
    let body =  plate;
    let apiURL = 'http://test.carjam.co.nz/api/car/';
    let key = '7AB2A35AEB2E258220FDAB8B65E5E88B7514BD63';
    this.http.get(apiURL + '?plate=' + body +'&key='+ key +'&f=json&translate=1')
      .subscribe(
        response => {
			//console.log(response.json().idh);
			(<HTMLInputElement>document.getElementById("make")).value = response.json().idh.vehicle.make;
			(<HTMLInputElement>document.getElementById("model")).value = response.json().idh.vehicle.model;
			(<HTMLInputElement>document.getElementById("carYear")).value = response.json().idh.vehicle.year_of_manufacture;
			(<HTMLInputElement>document.getElementById("exterior_color")).value = response.json().idh.vehicle.main_colour;
			(<HTMLInputElement>document.getElementById("bodystyle")).value = response.json().idh.vehicle.body_style;
			(<HTMLInputElement>document.getElementById("fuelType")).value = response.json().idh.vehicle.fuel_type;
			(<HTMLInputElement>document.getElementById("noOfOwners")).value = response.json().idh.vehicle.number_of_owners;
			(<HTMLInputElement>document.getElementById("WoFExpires")).value = response.json().hidh.vehicle.expiry_date_of_last_successful_wof;
			(<HTMLInputElement>document.getElementById("carPlate")).value = response.json().hidh.vehicle.plate;
        },
        error => {
         // alert(error.text());
          console.log(error.text());
        }
      );
  }

  createPost(){
    contentHeaders.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    this.postmodel.title = this.postmodel.make + ' ' + this.postmodel.model + ' ' + this.postmodel.year_manufacture;
    if(!(this.postmodel.abs_brakes==0)){
        this.postmodel.abs_brakes = 1;
    }
    if(!(this.postmodel.alarm==0)){
        this.postmodel.alarm = 1;
    }
    if(!(this.postmodel.central_locking==0)){
        this.postmodel.central_locking = 1;
    }
    if(!(this.postmodel.passenger_airbag==0)){
        this.postmodel.passenger_airbag = 1;
    }
    if(!(this.postmodel.sunroof==0)){
        this.postmodel.sunroof = 1;
    }
    if(!(this.postmodel.air_conditioning==0)){
        this.postmodel.air_conditioning = 1;
    }
    if(!(this.postmodel.alloy_wheels==0)){
        this.postmodel.alloy_wheels = 1;
    }
    if(!(this.postmodel.driver_airbag==0)){
        this.postmodel.driver_airbag = 1;
    }
    if(!(this.postmodel.power_steering==0)){
        this.postmodel.power_steering = 1;
    }
    if(!(this.postmodel.towbar==0)){
        this.postmodel.towbar = 1;
    }
    this.http.post(myGlobals.createAPIPath, this.postmodel, { headers: contentHeaders })
    .subscribe(
        response => {
            localStorage.setItem('postId', response.json().post_id);
            console.log('Post creation request for: ' + response.json().post_id);
        },
        error => {
           // alert(error.text());
            console.log(error.text());
        }
    );
  }
  
  updatePost(){
    contentHeaders.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    this.updatemodel.id = localStorage.getItem('postId');
    //this.updatemodel.listing_duration_end_time = new Date();
    //if((this.updatemodel.listing_duration_fixed_length == '7 days')){
        //this.updatemodel.listing_duration_end_time.setDate(this.updatemodel.listing_duration_end_time.getDate() + 7);
    //}
    //else{
        //this.updatemodel.listing_duration_end_time.setDate(this.updatemodel.listing_duration_end_time.getDate() +14);
    //}
  
    this.http.post(myGlobals.updateAPIPath, this.updatemodel, { headers: contentHeaders })
    .subscribe(
        response => {
            console.log('Post creation request for: ' + response.json());
        },
        error => {
           // alert(error.text());
            console.log(error.text());
        }
    );
  }


}
