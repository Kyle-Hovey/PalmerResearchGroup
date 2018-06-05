import { Component, OnInit } from '@angular/core';
import { Palmer } from '../palmer';
import { PalmerService } from '../palmer.service';

 
var _this = this;

@Component({
  selector: 'app-palmer',
  templateUrl: './palmer.component.html',
  styleUrls: ['./palmer.component.css']
})
export class PalmerComponent implements OnInit {
  palmer: Palmer = {
  risk: 0,
  latitude: "",
  longitude: ""
  };
 
  constructor(private palmerService: PalmerService) { }
 
  ngOnInit() {
  }

  calculateRisk(lat, lon) {
    this.getRiskFromLatLon(lat, lon);
  }

  onMarked(latLon){
    var latLonArray = latLon.split(" ");
    console.log(latLonArray);
    this.getRiskFromLatLon(latLonArray[0].trim(), latLonArray[1].trim())
  }

  getRiskFromLatLon(lat, lon) {
    this.palmerService.getRiskFromLatLon(lat, lon)
    .subscribe((data: Palmer) => {

      if (!data){
        this.palmer = {
        risk: "Data point not yet available",
		latitude: lat,
		longitude: lon
        }
      }
      else {
      this.palmer = {
        risk: data['risk'],
        latitude: data['latitude'],
        longitude: data['longitude']
      };
      console.log(data);
      }
    });
  }
}