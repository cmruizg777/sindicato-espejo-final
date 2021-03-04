import { Curso } from "./curso";
import { Examen } from "./examen";
import { Requisito } from "./requisito";

export interface ProductoServicio{
  curso: Curso;
  examen: Examen;
  costo: Number;
  tipo: Number;
  requisitos: Requisito[];

}
