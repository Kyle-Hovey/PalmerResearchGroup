import { Component, OnInit } from '@angular/core';
import { PalmerService } from '../palmer.service';
import { Palmer } from '../palmer';
import { Response } from '@angular/http';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css'],
  providers: [PalmerService]
})
export class RiskComponent implements OnInit {

  public palmer;
  
  constructor(private palmerService: PalmerService) { }

  ngOnInit(): void {
    this.getPalmer();
 	}

  getPalmer() {
      this.palmerService.getPalmer()
      .subscribe(palmerData => {
      this.palmer = palmerData
      console.log(palmerData)
      })
  }
}
