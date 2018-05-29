import { Component, OnInit } from '@angular/core';
import { Palmer } from '../palmer';
 
@Component({
  selector: 'app-palmer',
  templateUrl: './palmer.component.html',
  styleUrls: ['./palmer.component.css']
})
export class PalmerComponent implements OnInit {
  palmer: Palmer = {
  risk: 4,
  latitude: "-1233",
  longitude: "-412"
  };
 
  constructor() { }
 
  ngOnInit() {
  }
 
}