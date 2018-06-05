import { Component, OnInit, NgZone, EventEmitter, Input, Output } from '@angular/core';
import { } from '@types/googlemaps';
import { ViewChild } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  @Output() marked = new EventEmitter<string>();
  location = 'default location, update on map click';
  markers = [];
  map: google.maps.Map;


  constructor(private zone: NgZone) { }

  ngOnInit() {
  	
  	let mapProp = {
  		center: new google.maps.LatLng(41.8780, -93.0977),
  		zoom: 6,
  		mapTypeId: 'hybrid',
  		disableDefaultUI: true
  	}

  	this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);  

    google.maps.event.addListener(this.map, 'click', (e) => this.zone.run(() => this.placeMarker(e)));
  }

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
