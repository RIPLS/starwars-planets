import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { PlanetsService } from '../services/planets.service';

import { ApiResponse } from '../entities/api-response.entity';
import { PlanetEntity } from '../entities/planet.entity';

export class PlanetDataSource implements DataSource<PlanetEntity> {

    private planetsSubject = new BehaviorSubject<PlanetEntity[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

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

    loadPlanets(pageIndex: number, search: string = undefined) {
        this.loadingSubject.next(true);
        this.planetsService.GetPlanets(pageIndex, search).pipe(
            catchError(() => of<ApiResponse<PlanetEntity>>(null)),
            map(resp => {
                resp.results.forEach(element => {
                    let splitUrl = element.url.split('/');
                    element.id = splitUrl[splitUrl.length - 2];
                });
                return resp;
            }),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(resp => {
                this.countSubject.next(resp.count);
                this.planetsSubject.next(resp.results);
            });
    }
}