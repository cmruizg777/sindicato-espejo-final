import { Preinscripcion } from "./preinscripcion";
export interface Usuario{
  nombres: string ;
  apellidos: string ;
  username: string ;
  pass: string ;
  cedula: string ;
  estado_civil: string ;
  edad: Number ;
  nacionalidad: string ;
  instruccion: string ;
  direccion: string ;
  calle: string ;
  calle2: string;
  referencia: string;
  fechaNac: string;
  lugarNac: string;
  telefono: string;
  email: string;
  tipoSangre: string;
  tipoLicencia: string;
  disponibilidad: string;
  inscripciones: Preinscripcion[];
}
