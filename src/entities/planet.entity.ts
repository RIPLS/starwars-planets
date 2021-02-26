import { Film } from "./film.entity";
import { People } from "./people.entity";

export class PlanetEntity {
    name: string;
    population: string;
    residents: Array<People>;
    diameter: string; 
    terrain: string; //Strings separados por coma
    climate: string; //Strings separados por coma
    films: Array<Film>; 
    gravity: string; //Valor de gravedad de referencia
    water: string; //Porcentaje de agua
    url: string;

    constructor(){
		
    }
}