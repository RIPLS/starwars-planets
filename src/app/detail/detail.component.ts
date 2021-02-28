import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlanetsService } from '../../services/planets.service';
import { PlanetEntity } from '../../entities/planet.entity';
import { PeopleEntity } from '../../entities/people.entity';
import { FilmEntity } from '../../entities/film.entity';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  planetData: PlanetEntity;
  planetResidents: PeopleEntity[] = [];
  planetFilms: FilmEntity[] = [];
  planetID: number = 1;
  showMore = 'Show more';
  hidden: boolean;
  resident: PeopleEntity;
  film: FilmEntity;

  constructor(
    public planetsService: PlanetsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //Get detail
      this.planetID = params['id'];
      this.planetsService.GetPlanetById(this.planetID).subscribe(
        (resp) => {
          this.planetData = resp;
          this.getResidents(this.planetData);
          this.getFilms(this.planetData);
        }, (err) => {
          console.log(err.error.message);
        });
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
      this.showMore = 'Show less'
    }
    if (!this.hidden) {
      this.showMore = ' Show more'
    }
  }

}


