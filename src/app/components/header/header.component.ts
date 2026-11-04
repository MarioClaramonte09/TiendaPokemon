import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  // RouterLink: convierte un enlace en navegación interna (sin recargar la página)
  // RouterLinkActive: añade una clase CSS al enlace de la página actual
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Indica si el menú del móvil está desplegado o no
  menuAbierto = false;

  // Se ejecuta al pulsar el botón hamburguesa: abre o cierra el menú
  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  // Cierra el menú (lo usamos al pulsar un enlace, para que no se quede abierto)
  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}