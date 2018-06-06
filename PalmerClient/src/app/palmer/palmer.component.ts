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
  risk: "",
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
    this.palmerService
      .getRiskFromLatLon(lat, lon)
      .then((palmer: Palmer[]) => {
        this.palmer = palmer.map((palmer) => {
          if (!palmer) {
            palmer.risk = 'Not Available at this location.'
          }

          return palmer;
        });
      });
    }
  }
}