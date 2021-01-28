import { ProductoServicio } from "./productoServicio";

export interface Preinscripcion{
  id: Number
  comprobante: string;
  estado: Number;
  fecha: string;
  productoServicio: ProductoServicio;
  observaciones: string ;
}
