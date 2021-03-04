import { ProductoServicio } from "./productoServicio";
import { Turno } from "./turno";
import { Documento } from "./documento";
export interface Preinscripcion{
  id: Number
  comprobante: string;
  estado: Number;
  fecha: string;
  productoServicio: ProductoServicio;
  turno: Turno;
  observaciones: string ;
  documentos: Documento[];
}
