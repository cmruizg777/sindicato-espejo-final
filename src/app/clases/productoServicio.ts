import { Curso } from "./curso";
import { Examen } from "./examen";

export interface ProductoServicio{
  curso: Curso;
  examen: Examen;
  costo: Number;
  tipo: Number;
}
