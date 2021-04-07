import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { Inscripcion } from '../clases/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {
  inscripcion: Inscripcion;
  cedulaValida = false;
  fecha : NgbDateStruct;
  constructor() { }
  validarCedula(cedula: string): boolean{
    const tam = cedula.length;
    if(tam!==10){
      return false;
    }
    if(isNaN(Number(cedula))){
      return false;
    }
    const codigoProvincia = Number(cedula.substr(0,2));
    const digitoMenorA6 = Number(cedula.substr(2,1));
    const secuencia = (cedula.substr(3,1));
    const digitoVerificador = Number(cedula.substr(9,1));
    if(codigoProvincia<0 || codigoProvincia > 24){
      return false;
    }
    if(digitoMenorA6>=6){
      return false;
    }
    const arrayCoeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const arrayDeDigitos: string[] = cedula.split("");
    let suma = 0;

    arrayDeDigitos.forEach((value, index)=>{
      if(index < 9){
        const digito = Number(value);
        const producto = digito*arrayCoeficientes[index] < 10 ? digito*arrayCoeficientes[index]: digito*arrayCoeficientes[index]-9;
        suma += producto;
      }
    });
    let decenaSuperior;
    if(suma%10>0){
      decenaSuperior = (Math.trunc(suma/10) + 1) * 10;
    }else{
      decenaSuperior = suma;
    }

    const resultado = decenaSuperior - suma ;

    if(resultado == digitoVerificador){
      return true ;
    }
    return false;
  }

  validarDatos(fecha: NgbDateStruct, logged: boolean): number {
    this.fecha = fecha;
    if(this.inscripcion.apellidos.trim() === '' && !logged){
      this.inscripcion.errorApellidos();
      return 1;
    }
    if(this.inscripcion.calle == ''){
      this.inscripcion.errorCalle1();
      return 2;
    }
    if(this.inscripcion.calle2 == ''){
      this.inscripcion.errorCalle2();
      return 3;
    }
    this.cedulaValida = this.validarCedula(this.inscripcion.cedula);
    if(!this.cedulaValida && !logged){
      this.inscripcion.errorCedula();
      return 4;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.inscripcion.email).toLowerCase())){
      this.inscripcion.errorCorreo();
      return 5;
    }
    if(this.inscripcion.direccion.trim() === ''){
      this.inscripcion.errorDireccion();
      return 6;
    }
    if(this.inscripcion.estadoCivil.trim() == ''){
      this.inscripcion.errorEstadoCivil();
      return 7;
    }
    if(!this.fecha && !logged){
      this.inscripcion.errorFecha();
      return 8;
    }
    this.inscripcion.fechaNaciemiento = this.fecha.year +'-'+this.fecha.month+'-'+this.fecha.day;

    if(this.inscripcion.instruccion.trim() == ''){
      this.inscripcion.errorInstruccion();
      return 9;
    }
    if(this.inscripcion.lugarNac.trim() === '' && !logged){
      this.inscripcion.errorLugarNac();
      return 10;
    }
    if(this.inscripcion.nacionalidad.trim() === '' && !logged){
      this.inscripcion.errorNacionalidad();
      return 11;
    }
    if(this.inscripcion.nombres.trim() === '' && !logged){
      this.inscripcion.errorNombres();
      return 12;
    }
    if(!logged){
      if(this.inscripcion.pass1.trim() === '' || this.inscripcion.pass1.indexOf(' ')>=0){
        this.inscripcion.errorContrasena();
        return 13;
      }else{
        if(this.inscripcion.pass1 != this.inscripcion.pass2 ){
          this.inscripcion.errorContrasena2();
          return 14;
        }
      }
    }
    if(this.inscripcion.referencia == ''){
      this.inscripcion.errorReferencia();
      return 15;
    }
    if(this.inscripcion.telefono.trim() == ''){
      this.inscripcion.errorTelefono();
      return 16;
    }
    if(this.inscripcion.username.trim() == '' && !logged){
      this.inscripcion.errorUsername1();
      return 17;
    }else{
      if(this.inscripcion.username.indexOf(' ')>=0 && !logged){
        this.inscripcion.errorUsername1();
        return 18;
      }
    }
    /*
    if(this.formaPago.trim() === ''){
      alert('La forma de pago no se ha establecido!');
      return 19;
    }
    if(!this.comprobante){
      alert('Debe adjuntar la documentación y el pago requerido!');
      return 20;
    }*/

    return 0;
  }

}
