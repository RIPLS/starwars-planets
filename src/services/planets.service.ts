import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import { ApiResponse } from '../entities/api-response.entity';
import { PlanetEntity } from '../entities/planet.entity';
import { PeopleEntity } from '../entities/people.entity';
import { FilmEntity } from '../entities/film.entity';

@Injectable()
export class PlanetsService {
  apiUrl = environment.apiUrl + 'planets/';
  idSelected: number = 1;

  constructor(private http: HttpClient) { }

  GetPlanets(page: number, search: string = undefined) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    if(search) params = params.set('search', search);

    return this.http.get<ApiResponse<PlanetEntity>>(this.apiUrl, { params: params});
  }

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