import { Component, Input, OnInit } from '@angular/core';
import { PlanetEntity } from 'src/entities/planet.entity';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  @Input() planetData: PlanetEntity;
  planetBackground: string;

  constructor() { }

  ngOnInit() {
    this.planetBackground = 'url(' + this.planetData.backgroundurl + ') repeat-x';
  }

}
