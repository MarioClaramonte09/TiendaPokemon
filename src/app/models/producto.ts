// Modelo de datos: describe la forma de un producto tal y como lo devuelve Strapi.
// Una "interface" no genera código, solo sirve para que TypeScript compruebe los tipos.
export interface Producto {
  id: number;
  documentId: string;        // Identificador que usa Strapi para buscar un producto concreto
  nombre: string;
  descripcion: string | null; // Puede venir vacía (null)
  precio: number;
  categoria: string;         // Peluches, Cartas o Figuras
  pokemon: string;           // Nombre del Pokémon en PokéAPI (ej: "pikachu"), enlaza con la otra API
}

// Strapi envuelve las listas dentro de un objeto con "data" y "meta".
// Usamos <T> (genérico) para poder reutilizar esta forma con otros tipos de contenido.
export interface RespuestaStrapi<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}