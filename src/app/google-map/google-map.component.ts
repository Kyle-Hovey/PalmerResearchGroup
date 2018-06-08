import { Component, OnInit, NgZone, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { } from '@types/googlemaps';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { Palmer } from '../palmer';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  public isOpen: boolean;

  private mapTypeId: string;

  public content: string;

  private _palmer: Palmer = {
            risk: "",
            latitude: "",
            longitude: "",
            xCoord: "",
            yCoord: ""
          };

  public markers = [];
  public infoWindows = [];

  @Output() marked = new EventEmitter<string>();
  
  @Input()
  set palmer(palmer: Palmer) {
    this._palmer = (palmer);
    console.log(this._palmer);
  }

  get palmer(): Palmer {return this._palmer; }

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.zoom = 6;
    this.latitude = 41.8780;
    this.longitude = -93.0977;
    this.mapTypeId = 'hybrid';

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    var lat = $event.coords.lat;
    var lng = $event.coords.lng;
    console.log(lat + " " + lng)
    this.marked.emit(lat + " " + lng);
  }

  mapClicked($event: MouseEvent) {
    this.markers = [];
    var lat = $event.coords.lat;
    var lng = $event.coords.lng;
    console.log(lat + " " + lng)
    this.marked.emit(lat + " " + lng);
    this.markers.push({
      latitude: lat,
      longitude: lng,
      draggable: true
    })
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}