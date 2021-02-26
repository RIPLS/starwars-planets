import { PlanetEntity } from "./planet.entity";

export interface PlanetList {
    count: number;
    previous: string;
    next: string;
    result: Array<PlanetEntity>
}
