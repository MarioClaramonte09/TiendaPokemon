import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  // El componente NO habla con Strapi directamente: se lo pide al servicio
  private productosService = inject(ProductosService);

  productos: Producto[] = [];   // Lista de productos que se muestran
  cargando = true;              // true mientras esperamos la respuesta de Strapi
  error = false;                // true si la petición falla (por ejemplo, Strapi apagado)

  // ngOnInit se ejecuta una vez, cuando el componente se crea: ahí pedimos los datos
  ngOnInit(): void {
    // subscribe "activa" la petición y define qué hacer cuando llega la respuesta
    this.productosService.getProductos().subscribe({
      next: (lista) => {
        this.productos = lista;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }
}