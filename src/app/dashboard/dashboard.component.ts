import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';


import { PlanetsService } from '../../services/planets.service';
import { PlanetDataSource } from 'src/entities/planet-data-source.entity';
import { PlanetEntity } from 'src/entities/planet.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource: PlanetDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["seqNo", "name", "population"];
  searchText: string;

  constructor(
    private router: Router,
    public planetsService: PlanetsService,
    private route: ActivatedRoute,
  ) {
  }

  //Lifecycles
  ngOnInit() {
    this.dataSource = new PlanetDataSource(this.planetsService);

    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'];
      //Get detail
      this.dataSource.loadPlanets(1, this.searchText);
    });
  }

  ngAfterViewInit() {
    this.dataSource.setSort(this.sort);

    this.paginator.page
      .pipe(
        tap(() => {
          this.loadPlanetsPage()
        })
      )
      .subscribe();
  }

  loadPlanetsPage() {
    this.dataSource.loadPlanets(
      this.paginator.pageIndex + 1, this.searchText);
  }

  clearFilter(){
    this.searchText = undefined;
    this.router.navigateByUrl('/');
  }

  onRowClicked(planet: PlanetEntity) {
    this.router.navigateByUrl('/detail/' + planet.id);
  }


}
