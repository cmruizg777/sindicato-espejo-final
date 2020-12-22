import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { ValidadorService} from '../services/validador.service'
import { ApiRequestService} from '../services/api-request.service'
import { ResponseTurnos } from '../clases/response'
import { Inscripcion } from '../clases/inscripcion'
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
//import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
//import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
//import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import * as _rollupMoment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { AuthResponse } from '../clases/auth';

//const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  fecha: NgbDateStruct;

  private nativeElement : Node;


  fechaReference ;
  inscripcion: Inscripcion;
  comprobante = null;
  formaPago = 'TB';
  display2='';
  start: Date;
  cedulaValida = false;
  curso: any ;
  idServicio: Number;
  constructor(
    private validadorService: ValidadorService,
    private router: Router,
    private turnosService: ApiRequestService,
    private rutaActiva: ActivatedRoute,
    private api: ApiRequestService
    ) {
      this.inscripcion = new Inscripcion();
      const fechaAux =  new Date();
    //this.fecha = anio+"-"+mes+"-"+dia;
    //this.fecha = moment();

      this.start = new Date();
    }

  ngOnInit(): void {
    this.idServicio = this.rutaActiva.snapshot.params.id;
    this.api.obtenerCurso(this.idServicio, 2).subscribe((resp: ResponseTurnos)=>{
      console.log(resp);
      if(!resp.error){
        if(resp.data){
          this.curso = resp.data;
          this.inscripcion.apellidos = "BOLAÑOS RUIZ";
          this.inscripcion.calle1 = "GNRL. ENRIQUEZ";
          this.inscripcion.calle2 = "ALEGRIA";
          this.inscripcion.cedula = "1003659966";
          this.inscripcion.correo = "software.developer3@gmail.com";
          this.inscripcion.direccion = "BARRIO SAN JOSE, ATUNTAQUI";
          //this.inscripcion.disponibilidad =
          //this.inscripcion.edad =
          this.inscripcion.estado_civil = "C";
          this.fecha  = {
            day: 17,
            month: 9,
            year: 1990
          };

          this.inscripcion.fechaNaciemiento = "1990-09-17";

          this.inscripcion.instruccion = "B";
          this.inscripcion.lugarNaciemiento = "IBARRA, ECUADOR";
          this.inscripcion.nacionalidad = "ECUATORIANA";
          this.inscripcion.nombres = "LUIS ANGEL";
          this.inscripcion.pass1 = "xxxx4444";
          this.inscripcion.pass2 = "xxxx4444";
          this.inscripcion.referencia = "A MEDIA CUADRA DE LA TERMINAL FLOTA ANTEÑA";
          this.inscripcion.telefono = "0988116697";
          this.inscripcion.username = "angel12";
          //this.inscripcion.tipoLicencia
          //this.inscripcion.tipoSangre

        }
      }
  })
  }

  validarCedula(){
    if(this.inscripcion.cedula){
      if(this.inscripcion.cedula.trim().length == 10){
        const resp  = this.validadorService.validarCedula(this.inscripcion.cedula);
        this.cedulaValida = resp;
      }else{
        this.cedulaValida = false;
      }
    }
    if(!this.cedulaValida){
      alert('Cédula no válida')
    }
  }
  handleFileInput(files: FileList) {
    this.comprobante = files.item(0);
  }

///////////////////////////////////////////////
enviar(){
  const rCode = this.validarDatos();
  //console.log(rCode);
  //console.log(this.inscripcion);
  if(rCode === 0){
    const formData: FormData = new FormData();

    formData.append('_apellidos',this.inscripcion.apellidos);
    formData.append('_calle1',this.inscripcion.calle1);
    formData.append('_calle2',this.inscripcion.calle2);
    formData.append('_cedula',this.inscripcion.cedula);
    formData.append('_email',this.inscripcion.correo);
    formData.append('_direccion',this.inscripcion.direccion);
    formData.append('_estado',this.inscripcion.estado_civil);
    formData.append('_fecha',this.inscripcion.fechaNaciemiento);
    formData.append('_instruccion',this.inscripcion.instruccion);
    formData.append('_lugarN',this.inscripcion.lugarNaciemiento);
    formData.append('_nacionalidad',this.inscripcion.nacionalidad);
    formData.append('_nombres',this.inscripcion.nombres);
    formData.append('_password',this.inscripcion.pass1);
    formData.append('_referencia',this.inscripcion.referencia);
    formData.append('_telefono',this.inscripcion.telefono);
    formData.append('_username',this.inscripcion.username);
    formData.append('_fpago',this.formaPago);
    formData.append('_comprobante', this.comprobante, this.comprobante.name);
    formData.append('_servicio', ""+this.idServicio);
    this.enviarFormulario(formData);

  }
}

enviarFormulario(formData){
  this.turnosService.postFileInscripcion(formData).subscribe((data: ResponseTurnos) => {
    if(data.code==200){
      let form = new FormData();
      alert(data.data);
      form.append('_username',this.inscripcion.username);
      form.append('_password',this.inscripcion.pass1);
      this.turnosService.obtenerToken(form).subscribe((r : AuthResponse ) => {
        if(r.token){
          localStorage.setItem('token', r.token);
          this.router.navigate(['perfil']);
        }
      })
    }else{
      alert(`Ha habido un error: ${data.data}`);
    }
  }, error => {
    alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
    console.log(error);
  });
}


  ////////////////////////////////////////


  validarDatos(): number {
    if(this.inscripcion.apellidos.trim() === ''){
      this.inscripcion.errorApellidos();
      return 1;
    }
    if(this.inscripcion.calle1 == ''){
      this.inscripcion.errorCalle1();
      return 2;
    }
    if(this.inscripcion.calle2 == ''){
      this.inscripcion.errorCalle2();
      return 3;
    }
    this.validarCedula();
    if(!this.cedulaValida){
      this.inscripcion.errorCedula();
      return 4;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.inscripcion.correo).toLowerCase())){
      this.inscripcion.errorCorreo();
      return 5;
    }
    if(this.inscripcion.direccion.trim() === ''){
      this.inscripcion.errorDireccion();
      return 6;
    }
    if(this.inscripcion.estado_civil.trim() == ''){
      this.inscripcion.errorEstadoCivil();
      return 7;
    }
    if(!this.fecha){
      this.inscripcion.errorFecha();
      return 8;
    }
    this.inscripcion.fechaNaciemiento = this.fecha.year +'-'+this.fecha.month+'-'+this.fecha.day;

    if(this.inscripcion.instruccion.trim() == ''){
      this.inscripcion.errorInstruccion();
      return 9;
    }
    if(this.inscripcion.lugarNaciemiento.trim() === ''){
      this.inscripcion.errorLugarNac();
      return 10;
    }
    if(this.inscripcion.nacionalidad.trim() === ''){
      this.inscripcion.errorNacionalidad();
      return 11;
    }
    if(this.inscripcion.nombres.trim() === ''){
      this.inscripcion.errorNombres();
      return 12;
    }
    if(this.inscripcion.pass1.trim() === '' || this.inscripcion.pass1.indexOf(' ')>=0){
      this.inscripcion.errorContrasena();
      return 13;
    }else{
      if(this.inscripcion.pass1 != this.inscripcion.pass2 ){
        this.inscripcion.errorContrasena2();
        return 14;
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
    if(this.inscripcion.username.trim() == ''){
      this.inscripcion.errorUsername1();
      return 17;
    }else{
      if(this.inscripcion.username.indexOf(' ')>=0){
        this.inscripcion.errorUsername1();
        return 18;
      }
    }

    if(this.formaPago.trim() === ''){
      alert('La forma de pago no se ha establecido!');
      return 19;
    }
    if(!this.comprobante){
      alert('Debe adjuntar la documentación y el pago requerido!');
      return 20;
    }

    return 0;
  }


}
