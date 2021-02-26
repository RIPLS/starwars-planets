import { Component, OnInit } from '@angular/core';

import { PlanetsService } from '../../services/planets.service';
import { PlanetEntity } from '../../entities/planet.entity';
import { PeopleEntity } from '../../entities/people.entity';
import { FilmEntity } from '../../entities/film.entity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  planetData: PlanetEntity;
  planetResidents: PeopleEntity[]=[];
  planetFilms: FilmEntity[]=[];
  planetiD: number = 1;
  showMore = 'show More';
  hidden: boolean;
  resident: PeopleEntity;
  film: FilmEntity;

  constructor(
    public planetsService: PlanetsService,
  ) { }

  ngOnInit() {
    //Get Info
    this.planetsService.GetPlanetById(this.planetiD).subscribe(
      (resp) => {
        this.planetData = resp;
        this.getResidents(this.planetData);
        this.getFilms(this.planetData);
      }, (err) => {
        console.log(err.error.message);
      });
  }

  //Residents
  getResidents(data: PlanetEntity) {
    for (var item = 0; item < data.residents.length; item++) {
      this.planetsService.GetResidentsByURL(data.residents[item]).subscribe(
        (resp) => {
          this.resident = resp;
          this.planetResidents.push(this.resident);
        }, (err) => {
          console.log(err.error.message);
        });
    }
  }

    //Residents
    getFilms(data: PlanetEntity) {
      for (var item = 0; item < data.films.length; item++) {
        this.planetsService.GetFilmsByURL(data.films[item]).subscribe(
          (resp) => {
            this.film = resp;
            this.planetFilms.push(this.film);
          }, (err) => {
            console.log(err.error.message);
          });
      }
    }

  //Show More or Less
  toggle() {
    this.hidden = !this.hidden;
    if (this.hidden) {
      this.showMore = 'show less'
    }
    if (!this.hidden) {
      this.showMore = ' show more'
    }
  }

}


