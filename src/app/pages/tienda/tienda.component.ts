import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { DatosPokemon } from '../../models/pokemon';
import { ProductosService } from '../../services/productos.service';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  // Los componentes no hablan con las APIs: se lo piden a los servicios
  private productosService = inject(ProductosService);
  private pokeapiService = inject(PokeapiService);

  productos: Producto[] = [];   // Productos que vienen de Strapi
  cargando = true;              // true mientras esperamos a Strapi
  error = false;                // true si Strapi falla

  // Datos de PokéAPI de cada producto, guardados por nombre de Pokémon.
  // Ejemplo: { pikachu: { imagen: '...', tipos: ['electric'] } }
  datosPokemon: Record<string, DatosPokemon> = {};

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (lista) => {
        this.productos = lista;
        this.cargando = false;
        // Con los productos ya cargados, pedimos a PokéAPI los datos de cada Pokémon
        this.cargarDatosPokemon(lista);
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  // Pide a PokéAPI los datos de cada producto, uno por uno
  private cargarDatosPokemon(lista: Producto[]): void {
    for (const producto of lista) {
      this.pokeapiService.getPokemon(producto.pokemon).subscribe({
        next: (datos) => {
          // Guardamos los datos usando el nombre del Pokémon como clave
          this.datosPokemon[producto.pokemon] = datos;
        },
        // Si un Pokémon falla (nombre mal escrito en Strapi, por ejemplo),
        // simplemente esa tarjeta se queda sin imagen y las demás siguen bien
        error: () => {}
      });
    }
  }
}