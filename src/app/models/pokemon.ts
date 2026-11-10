// Parte de la respuesta de PokéAPI que nos interesa.
// PokéAPI devuelve muchísimos datos, y aquí solo describimos los que vamos a usar.
export interface RespuestaPokeApi {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string; // URL de la ilustración oficial
      };
    };
  };
  types: { type: { name: string } }[]; // Lista de tipos (ej: electric, fire...)
}

// Versión simplificada que usan nuestros componentes:
// transformamos la respuesta enorme de PokéAPI en solo lo necesario.
export interface DatosPokemon {
  imagen: string;
  tipos: string[];
}
