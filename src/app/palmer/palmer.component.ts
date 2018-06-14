import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Palmer } from '../palmer';
import { PalmerService } from '../palmer.service';

 
var _this = this;

@Component({
  selector: 'app-palmer',
  templateUrl: './palmer.component.html',
  styleUrls: ['./palmer.component.css'],
  providers: [PalmerService]
})

export class PalmerComponent implements OnInit {
  
  palmer: Palmer = {
  risk: "",
  latitude: "",
  longitude: "",
  xCoord: "",
  yCoord: "",
  percentile: ""
  };

  @Output() riskFound = new EventEmitter<Palmer>();

  constructor(private palmerService: PalmerService) { }
 
  ngOnInit() {
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
        risk: "Not available for this area.",
        latitude: "",
        longitude: "",
        xCoord: "",
        yCoord: "",
        percentile: ""
        }
        this.riskFound.emit(this.palmer);
      }
      else {
        this.palmer = {
          risk: data['risk'],
          latitude: data['latitude'],
          longitude: data['longitude'],
          xCoord: data['xCoord'],
          yCoord: data['yCoord'],
          percentile: data['percentile']
        };
      }
    });
  }
}