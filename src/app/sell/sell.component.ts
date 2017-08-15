import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers.component';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  selectedArray:any = [];
  place:string = 'Model';
  isRadioSelected:boolean = false;
  showDNClass: boolean = true;
  toTrue: boolean = false;
  showPhotoClass = false;
  showDetailsClass = false;

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
  constructor() {}

  ngOnInit() {
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

    if(clickedBtn == 'carDetailsbtn'){ 
      this.showPhotoClass = false;
      this.showDNClass = (this.showDNClass == true ? false : true);
      this.toTrue = (this.toTrue ==  false ? true : false);
    }
    if(clickedBtn == 'carListingbtn'){   
      this.showDNClass = false;
      this.showPhotoClass = (this.showPhotoClass == false ? true : false);
      this.toTrue = (this.toTrue ==  true ? false : true);
    }
    if(clickedBtn == 'showPhotosbtn'){
      this.showPhotoClass = false;
      this.showDNClass = false;
      this.toTrue = false;
      this.showDetailsClass = (this.showDetailsClass ==  false ? true : false);
    }
  }

}