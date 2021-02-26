import { FilmEntity } from "./film.entity";
import { PeopleEntity } from "./people.entity";

export interface PlanetEntity {
    name: string;
    population: string;
    residents: string[];
    diameter: string; 
    terrain: string; //Strings separados por coma
    climate: string; //Strings separados por coma
    films: string[]; 
    gravity: string; //Valor de gravedad de referencia
    water: string; //Porcentaje de agua
    url: string;
}