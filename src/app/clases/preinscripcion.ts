import { ProductoServicio } from "./productoServicio";

export interface Preinscripcion{
  comprobante: string;
  estado: Number;
  fecha: string;
  productoServicio: ProductoServicio;
  observaciones: string ;
}
