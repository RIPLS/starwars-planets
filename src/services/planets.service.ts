import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';

import { ApiResponse } from '../entities/ApiResponse.entity';
import { PlanetEntity } from '../entities/planet.entity';

@Injectable()
export class PlanetsService {
  apiUrl = environment.apiUrl + 'planets/';
  public planetsSubject = new BehaviorSubject<PlanetEntity[]>(null);

  constructor(private http: HttpClient) { }

  GetById(id: number) {
    this.http.get(this.apiUrl + id).subscribe(
      (data: ApiResponse<PlanetEntity[]>) => {
        //data info
        this.planetsSubject.next(data.data);
      }, error => {
        //error Handling
        console.log(error);
      }
    )
  }
  // GetById(id:number){
  //   return this.http.get<ApiResponse<PlanetEntity>>(this.apiUrl+id);
  // }

}

