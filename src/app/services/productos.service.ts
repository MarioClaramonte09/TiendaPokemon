import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto, RespuestaStrapi } from '../models/producto';

// @Injectable con providedIn: 'root' crea UNA sola instancia del servicio
// y la comparte con toda la aplicación (patrón singleton).
@Injectable({ providedIn: 'root' })
export class ProductosService {
  // inject() nos da el HttpClient, la herramienta de Angular para hacer peticiones HTTP.
  private http = inject(HttpClient);

  // Dirección de la colección "Producto" en nuestro Strapi local.
  private readonly urlApi = 'http://localhost:1337/api/productos';

  // Devuelve la lista completa de productos.
  // Devuelve un Observable: es una "promesa de datos" que llegarán cuando Strapi responda.
  // Hasta que alguien se suscriba (subscribe) a él, la petición no se envía.
  getProductos(): Observable<Producto[]> {
    return this.http.get<RespuestaStrapi<Producto>>(this.urlApi).pipe(
      // map transforma la respuesta: nos quedamos solo con el array "data",
      // que es lo que de verdad nos interesa.
      map(respuesta => respuesta.data)
    );
  }

  // Devuelve un único producto. En Strapi 5 se busca por su documentId.
  getProducto(documentId: string): Observable<Producto> {
    return this.http.get<{ data: Producto }>(`${this.urlApi}/${documentId}`).pipe(
      map(respuesta => respuesta.data)
    );
  }
}