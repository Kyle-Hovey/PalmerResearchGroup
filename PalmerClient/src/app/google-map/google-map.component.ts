import { Component, OnInit, NgZone, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { } from '@types/googlemaps';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

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

  public markers = []
  
  @Output() marked = new EventEmitter<string>();
  
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

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"],
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker ${label || index}`)
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
/*
  private placeMarker(event) {
    this.deleteMarkers();
    var latLng = event.latLng;
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });
    this.map.panTo(latLng);
    this.map.setZoom(14);
    this.map.setCenter(marker.getPosition());
    this.location = latLng.toString();
    console.log(this.location);
    this.markers.push(marker);
    this.marked.emit(this.location);
  }
*/
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }


}
