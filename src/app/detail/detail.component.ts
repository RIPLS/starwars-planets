import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

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
  showElements: boolean = false;
  resident: PeopleEntity;
  film: FilmEntity;

  constructor(
    public planetsService: PlanetsService,
    private _location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //Get detail
      this.planetID = params['id'];
      this.planetsService.GetPlanetById(this.planetID).subscribe(
        (resp) => {
          this.planetData = resp;
          this.planetData.backgroundurl="assets/images/planets/" + this.planetID + ".png";
        }, (err) => {
          console.log(err.error.message);
        });
    });

  }

  onBack() {
    this._location.back();
  }

  //Residents
  getResidents() {
    for (var item = 0; item < this.planetData.residents.length; item++) {
      this.planetsService.GetResidentsByURL(this.planetData.residents[item]).subscribe(
        (resp) => {
          this.resident = resp;
          this.planetResidents.push(this.resident);
        }, (err) => {
          console.log(err.error.message);
        });
    }
  }

  //Residents
  getFilms() {
    for (var item = 0; item < this.planetData.films.length; item++) {
      this.planetsService.GetFilmsByURL(this.planetData.films[item]).subscribe(
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
    this.showElements = !this.showElements;
    if (this.showElements) {
      if (!this.planetResidents.length || !this.planetFilms.length){
        this.getResidents();
        this.getFilms();
      }
      this.showMore = 'Show less'
    }
    if (!this.showElements) {
      this.showMore = ' Show more'
    }
  }

}


