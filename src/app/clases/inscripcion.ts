export class Inscripcion{
  mensajes = [
    '',
    'Debe ingresar sus apellidos',
    'Debe ingresar la calle primaria de su dirección.',
    'Debe ingresar la calle secundaria de su dirección.',
    'Debe ingresar una cédula válida',
    'Debe ingresar un email válido',
    'Debe ingresar su dirección.',
    'Debe seleccionar su estado civil',
    'Debe seleccionar una fecha válida',
    'Debe ingresar su instrucción.',
    'Debe ingresar su lugar de nacimiento',
    'Debe ingresar su nacionalidad',
    'Debe ingresar sus nombres',
    'Debe ingresar una contraseña de al menos 8 caracteres',
    'Las contraseñas no coinciden',
    'Debe ingresar una referencia de su domicilio.',
    'Debe ingresar un número de teléfono válido',
    'Debe ingresar un username (nombre de usuario)',
    'Su nombre de usuario no puede tener espacios',
    'Debe ingresar su edad',
    'Debe ingresar su tipo de sangre',
    'Debe ingresar su disponibilidad de tiempo',
    'Debe seleccionar el tipo de licencia',
  ]
  id ;
  nombres: string = '';
  apellidos: string = '';
  username: string = '';
  pass1: string = '';
  pass2: string = '';
  cedula: string = '';
  estado_civil: string = '';
  edad: Number = 0;
  nacionalidad: string = '';
  instruccion: string = '';
  direccion: string = '';
  calle1: string = '';
  calle2: string= '';
  referencia: string= '';
  fechaNaciemiento: string= '';
  lugarNaciemiento: string= '';
  telefono: string= '';
  correo: string= '';
  tipoSangre: string= '';
  tipoLicencia: string= '';
  disponibilidad: string= '';


  errorNombres(){
    alert(this.mensajes[0]);
  }
  errorApellidos(){
    alert(this.mensajes[1]);
  }
  errorCedula(){
    alert(this.mensajes[2]);
  }
  errorEstadoCivil(){
    alert(this.mensajes[3]);
  }
  errorEdad(){
    alert(this.mensajes[4]);
  }
  errorDireccion(){
    alert(this.mensajes[5]);
  }
  errorCalle1(){
    alert(this.mensajes[6]);
  }
  errorCalle2(){
    alert(this.mensajes[7]);
  }
  errorReferencia(){
    alert(this.mensajes[8]);
  }
  errorFecha(){
    alert(this.mensajes[9]);
  }
  errorLugarNac(){
    alert(this.mensajes[10]);
  }
  errorTelefono(){
    alert(this.mensajes[11]);
  }
  errorCorreo(){
    alert(this.mensajes[12]);
  }
  errorDisponibilidad(){
    alert(this.mensajes[13]);
  }
  errorTipoSangre(){
    alert(this.mensajes[14]);
  }
  errorTipoLicencia(){
    alert(this.mensajes[15]);
  }
  errorContrasena(){
    alert(this.mensajes[16]);
  }
  errorContrasena2(){
    alert(this.mensajes[16]);
  }
  errorUsername1(){
    alert(this.mensajes[17]);
  }
  errorUsername2(){
    alert(this.mensajes[18]);
  }
  errorInstruccion(){
    alert(this.mensajes[6]);
  }
  errorNacionalidad(){
    alert(this.mensajes[19]);
  }
}
