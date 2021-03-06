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
  estadoCivil: string = '';
  edad: Number = 0;
  nacionalidad: string = '';
  instruccion: string = '';
  direccion: string = '';
  calle: string = '';
  calle2: string= '';
  referencia: string= '';
  fechaNaciemiento: string= '';
  lugarNac: string= '';
  telefono: string= '';
  email: string= '';
  tipoSangre: string= '';
  tipoLicencia: string= '';
  disponibilidad: string= '';



  errorApellidos(){
    alert(this.mensajes[1]);
  }
  errorCalle1(){
    alert(this.mensajes[2]);
  }
  errorCalle2(){
    alert(this.mensajes[3]);
  }
  errorCedula(){
    alert(this.mensajes[4]);
  }
  errorCorreo(){
    alert(this.mensajes[5]);
  }
  errorDireccion(){
    alert(this.mensajes[6]);
  }
  errorEstadoCivil(){
    alert(this.mensajes[7]);
  }
  errorFecha(){
    alert(this.mensajes[8]);
  }
  errorInstruccion(){
    alert(this.mensajes[9]);
  }
  errorLugarNac(){
    alert(this.mensajes[10]);
  }
  errorNacionalidad(){
    alert(this.mensajes[11]);
  }
  errorNombres(){
    alert(this.mensajes[12]);
  }
  errorContrasena(){
    alert(this.mensajes[13]);
  }
  errorContrasena2(){
    alert(this.mensajes[14]);
  }
  errorReferencia(){
    alert(this.mensajes[15]);
  }
  errorTelefono(){
    alert(this.mensajes[16]);
  }

  errorUsername1(){
    alert(this.mensajes[17]);
  }
  errorUsername2(){
    alert(this.mensajes[18]);
  }


  errorEdad(){
    alert(this.mensajes[19]);
  }
  errorDisponibilidad(){
    alert(this.mensajes[20]);
  }
  errorTipoSangre(){
    alert(this.mensajes[21]);
  }
  errorTipoLicencia(){
    alert(this.mensajes[22]);
  }


}
