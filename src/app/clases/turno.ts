import { Horario } from "./horario";
export interface Turno{
  fecha: string;
  horario: Horario;
  confirmado: boolean;
}
