import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

// Configuración global de la aplicación: aquí se "activan" las herramientas que usa Angular.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Activa el sistema de rutas (qué página se ve en cada URL)
    provideRouter(routes),
    // Activa HttpClient, necesario para pedir datos a Strapi y a PokéAPI.
    // withFetch() usa la API "fetch" del navegador, recomendada cuando hay SSR.
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};