import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import {NgModel} from '@angular/forms';
import {} from '@types/googlemaps';

declare var google:any;

@Directive({
  selector: '[appPlaceLookup]',
  providers: [NgModel],
  host: {
    '(input)' : 'onInputChange()'
  }  
})
export class PlaceLookupDirective implements OnInit{

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  
    private element: HTMLInputElement;
  
    constructor(el: ElementRef) {
      this.element = el.nativeElement;
    }
  
    ngOnInit() {
      const autocomplete = new google.maps.places.Autocomplete(this.element, {
        types: ['(cities)'],
        componentRestrictions: {country: 'nz'}
      });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        console.log(this.onSelect.emit(place));
      });
    }

    invokeEvent(place:Object) {
      this.onSelect.emit(place);
    }
}
