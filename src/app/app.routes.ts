import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

// Tabla de rutas: asocia cada URL con el componente (página) que se muestra.
export const routes: Routes = [
  { path: '', component: HomeComponent },              // http://localhost:4200/
  { path: 'tienda', component: TiendaComponent },      // http://localhost:4200/tienda
  { path: 'contacto', component: ContactoComponent },  // http://localhost:4200/contacto
  { path: '**', redirectTo: '' }                       // Cualquier URL desconocida vuelve al inicio
];