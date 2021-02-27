import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

import { PlanetsService } from '../../services/planets.service';
import { PlanetDataSource } from 'src/entities/planet-data-source.entity';
import { ApiResponse } from '../../entities/api-response.entity';
import { PlanetEntity } from 'src/entities/planet.entity';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource: PlanetDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ["seqNo", "description", "duration"];

  constructor(
    private router: Router,
    public planetsService: PlanetsService,) {
  }

  //Lifecycles
  ngOnInit() {
    this.dataSource = new PlanetDataSource(this.planetsService);
    this.dataSource.loadPlanets(1);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadPlanetsPage())
      )
      .subscribe();
  }

  loadPlanetsPage() {
    this.dataSource.loadPlanets(
      this.paginator.pageIndex + 1);
  }

  onRowClicked(planet: PlanetEntity) {
    this.router.navigateByUrl('/home/' + planet.id);
  }


}
