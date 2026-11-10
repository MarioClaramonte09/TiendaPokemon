import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { DatosPokemon, RespuestaPokeApi } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokeapiService {
  private http = inject(HttpClient);

  // Dirección base de PokéAPI (pública, sin registro ni clave)
  private readonly urlApi = 'https://pokeapi.co/api/v2/pokemon';

  // CACHÉ: guardamos las peticiones ya hechas, para no pedir dos veces el mismo Pokémon.
  // La clave es el nombre del Pokémon y el valor es su Observable.
  private cache = new Map<string, Observable<DatosPokemon>>();

  getPokemon(nombre: string): Observable<DatosPokemon> {
    const clave = nombre.toLowerCase();

    // Si ya lo hemos pedido antes, devolvemos el guardado
    const guardado = this.cache.get(clave);
    if (guardado) {
      return guardado;
    }

    // Si no, hacemos la petición y la guardamos en la caché
    const peticion = this.http.get<RespuestaPokeApi>(`${this.urlApi}/${clave}`).pipe(
      // map: de toda la respuesta, nos quedamos solo con la imagen y los tipos
      map(respuesta => ({
        imagen: respuesta.sprites.other['official-artwork'].front_default,
        tipos: respuesta.types.map(t => t.type.name)
      })),
      // shareReplay(1): si varios piden lo mismo a la vez, la petición se hace una sola vez
      // y el resultado se recuerda para los siguientes
      shareReplay(1)
    );

    this.cache.set(clave, peticion);
    return peticion;
  }
}
