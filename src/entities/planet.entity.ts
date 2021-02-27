import { FilmEntity } from "./film.entity";

export interface PlanetEntity {
    id: string;
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