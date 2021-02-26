import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { PlanetsService } from '../../services/planets.service';
import { PlanetEntity } from '../../entities/planet.entity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  planetiD: number = 1;
  planetData: PlanetEntity[]=[];

  public planet: PlanetEntity = new PlanetEntity();

  constructor(
    public planetsService: PlanetsService,
  ) { }

  ngOnInit() {
    //Get Info
    this.planetData= this.planetsService.GetById(this.planetiD).subscribe(
      (resp) => {
        this.planet = resp["data"];
      }, (err) => {
        // this.notificacion.showerror("Rendicion error",err.error.message);
      });
  }

}


