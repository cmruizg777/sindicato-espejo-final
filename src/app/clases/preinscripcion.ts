import { ProductoServicio } from "./productoServicio";
import { Turno } from "./turno";
export interface Preinscripcion{
  id: Number
  comprobante: string;
  estado: Number;
  fecha: string;
  productoServicio: ProductoServicio;
  turno: Turno;
  observaciones: string ;
}
