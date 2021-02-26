import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import { PlanetEntity } from '../entities/planet.entity';
import { PeopleEntity } from '../entities/people.entity';
import { FilmEntity } from '../entities/film.entity';

@Injectable()
export class PlanetsService {
  apiUrl = environment.apiUrl + 'planets/';

  constructor(private http: HttpClient) { }

  GetAllPlanets() { }

  GetPlanetById(id: number): Observable<PlanetEntity> {
    return this.http.get<PlanetEntity>(this.apiUrl + id);
  }

  GetResidentsByURL(url: string): Observable<PeopleEntity> {
    return this.http.get<PeopleEntity>(url);
  }

  GetFilmsByURL(url: string): Observable<FilmEntity> {
    return this.http.get<FilmEntity>(url);
  }


}