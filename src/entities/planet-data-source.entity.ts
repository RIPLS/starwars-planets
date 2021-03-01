import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, finalize, map, take } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';

import { PlanetsService } from '../services/planets.service';

import { ApiResponse } from '../entities/api-response.entity';
import { PlanetEntity } from '../entities/planet.entity';

export class PlanetDataSource implements DataSource<PlanetEntity> {

    private planetsSubject = new BehaviorSubject<PlanetEntity[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public sort: MatSort;
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.countSubject.asObservable();

    constructor(private planetsService: PlanetsService) { }

    connect(collectionViewer: CollectionViewer): Observable<PlanetEntity[]> {
        return this.planetsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.planetsSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadPlanets(pageIndex: number, search: string = undefined,) {
        this.loadingSubject.next(true);
        this.planetsService.GetPlanets(pageIndex, search).pipe(
            catchError(() => of<ApiResponse<PlanetEntity>>(null)),
            map(resp => {
                resp.results.forEach(element => {
                    let splitUrl = element.url.split('/');
                    element.id = +splitUrl[splitUrl.length - 2];
                    if (element.population != "unknown") {
                        element.population = +element.population;            
                    };
                });
                return resp;
            }),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(resp => {
            this.countSubject.next(resp.count);
            this.planetsSubject.next(resp.results);
        });
    }

    setSort(sort: MatSort) {
        this.sort = sort;
        this.sort.sortChange.subscribe(sort => {
            let sortedPlanets = this.sortPlanets(this.planetsSubject.value, sort);
            this.planetsSubject.next(sortedPlanets);
        }
        );
    }

    sortPlanets(data: PlanetEntity[], sort: Sort) {
        if (!sort.active || sort.direction === '') {
            return;
        }

        function compare(a: number | string, b: number | string, isAsc: string) {
            let direction: boolean = isAsc == 'asc';
            return (a < b ? -1 : 1) * (direction ? 1 : -1);
        };

        data = data.sort((a, b) => {
            switch (sort.active) {
                case 'seqNo': return compare(a.id, b.id, sort.direction);
                case 'name': return compare(a.name, b.name, sort.direction);
                case 'population': return compare(a.population, b.population, sort.direction);
                default: return 0;
            }
        });
        return data;
    }
}