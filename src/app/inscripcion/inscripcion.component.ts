import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { ValidadorService} from '../services/validador.service'
import { ApiRequestService} from '../services/api-request.service'
import { ResponseTurnos } from '../clases/response'
import { Inscripcion } from '../clases/inscripcion'
//import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
//import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
//import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import * as _rollupMoment from 'moment';
import { Router } from '@angular/router';
import { from } from 'rxjs';

//const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  private nativeElement : Node;


  fecha ;
  fechaReference ;
  inscripcion: Inscripcion;
  comprobante = null;
  formaPago = 'TB';
  display2='';
  start: Date;
  cedulaValida = false;

  constructor(
    private validadorService: ValidadorService,
    private router: Router,
    private turnosService: ApiRequestService
    ) {
      this.inscripcion = new Inscripcion();
      const fechaAux =  new Date();
    //this.fecha = anio+"-"+mes+"-"+dia;
    //this.fecha = moment();

    this.start = new Date();
    /*const obs  =this.turnosService.obtenerFecha().subscribe( (resp : ResponseTurnos) => {

      if(!resp.error){

        this.fechaReference = resp.data;
        this.fecha = moment(resp.data, 'YYYY-MM-DD');
        //console.log(this.fecha.format().split("T")[0])
      }
      obs.unsubscribe();
    });*/

    }

  ngOnInit(): void {
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
  if(rCode){
    const formData: FormData = new FormData();
    formData.append('_fecha',this.fecha);
    formData.append('_nombres',this.inscripcion.nombres);
    formData.append('_apellidos',this.inscripcion.apellidos);
    formData.append('_cedula',this.inscripcion.cedula);
    formData.append('_email',this.inscripcion.correo);
    formData.append('_direccion',this.inscripcion.direccion);
    formData.append('_calle1',this.inscripcion.calle1);
    formData.append('_calle2',this.inscripcion.calle2);
    formData.append('_fpago',this.formaPago);
    formData.append('_telefono',this.inscripcion.telefono);
    formData.append('_lugarN',this.inscripcion.lugarNaciemiento);
    formData.append('_estado',this.inscripcion.estado_civil);
    formData.append('_instruccion',this.inscripcion.instruccion);
    formData.append('_nacionalidad',this.inscripcion.nacionalidad);
    formData.append('_tipoLicencia',this.inscripcion.tipoLicencia);

    if (this.formaPago == 'TB'){
      if(this.comprobante){
        formData.append('_comprobante', this.comprobante, this.comprobante.name);
        this.enviarFormulario(formData);
      }else{
        this.turnosService.obtenerSocioInfo(this.inscripcion.cedula).subscribe( (r: any) => {
          if(r.data){
            this.enviarFormulario(formData);
          }else{
            alert('Es necesario que cargue su comprobante de pago');
          }
        })
      }
    }
  }
}

enviarFormulario(formData){
  this.turnosService.postFile(formData).subscribe((data: ResponseTurnos) => {
    if(data.code==200){
      alert('Su turno se ha almacenado correctamente, por favor espere el mensaje de confirmación en su correo.');
      this.router.navigate(['inicio']);

    }else{
      alert(`Ha habido un error: ${data.data}`);
    }
  }, error => {
    alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
    console.log(error);
  });
}




  ////////////////////////////////////////


  validarDatos(): boolean {
    if(!this.fecha){
      this.inscripcion.errorFecha();
      return false;
    }
    if(!this.cedulaValida){
      this.inscripcion.errorCedula();
      return false;
    }
    if(this.inscripcion.nombres.trim() === ''){
      this.inscripcion.errorNombres();
      return false;

    }
    if(this.inscripcion.apellidos.trim() === ''){
      this.inscripcion.errorApellidos();
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.inscripcion.correo).toLowerCase())){
      this.inscripcion.errorCorreo();
      return false;
    }
    if(this.inscripcion.direccion.trim() === ''){
      this.inscripcion.errorDireccion();
      return false;
    }
    if(this.inscripcion.calle1 == ''){
      this.inscripcion.errorCalle1();
      return false;
    }
    if(this.inscripcion.calle2 == ''){
      this.inscripcion.errorCalle2();
      return false;
    }
    if(this.formaPago.trim() === ''){

    }
    if(this.inscripcion.lugarNaciemiento.trim() === ''){
      this.inscripcion.errorLugarNac();
      return false;
    }
    if(this.inscripcion.telefono.trim() == ''){
      this.inscripcion.errorTelefono();
      return false;
    }
    if(this.inscripcion.tipoLicencia.trim() == ''){
      this.inscripcion.errorTipoLicencia();
      return false;
    }

    return true;
  }


}
