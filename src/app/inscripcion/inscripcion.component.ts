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
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
//import { provincias } from '../clases/provincias.js'
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
  loading = true;
  minDate;
  maxDate;
  logged = false;
  constructor(
    private validadorService: ValidadorService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private api: ApiRequestService,
    private auth: AuthService
    ) {
      this.inscripcion = new Inscripcion();
      const fechaAux =  new Date();
      this.start = new Date();
    }

    subs : Subscription;

  ngOnInit(): void {

    this.subs = this.auth.userStatus().subscribe( status => {
      if(status){
        this.loading = false;
        this.router.navigate(['/perfil'])
      }
    })

    this.idServicio = this.rutaActiva.snapshot.params.id;
    this.minDate = { year: 1970, month: 1, day: 1 };
    this.maxDate = {year:new Date().getFullYear() - 18, month: 1, day: 1}

    this.api.obtenerCurso(this.idServicio, 2).subscribe((resp: ResponseTurnos)=>{
      if(!resp.error){
        if(resp.data){
          this.curso = resp.data;
          this.loading = false;
          this.fecha  = {
            day: 17,
            month: 9,
            year: 1990
          };
          /*
          this.inscripcion.apellidos = "BOLAÑOS RUIZ";
          this.inscripcion.calle1 = "GNRL. ENRIQUEZ";
          this.inscripcion.calle2 = "ALEGRIA";
          this.inscripcion.cedula = "1003659966";
          this.inscripcion.correo = "software.developer3@gmail.com";
          this.inscripcion.direccion = "BARRIO SAN JOSE, ATUNTAQUI";
          //this.inscripcion.disponibilidad =
          //this.inscripcion.edad =
          this.inscripcion.estado_civil = "C";


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
          //this.inscripcion.tipoSangre*/

          this.logged = this.auth.state ;
          if ( this.logged ){
            let profile = JSON.parse(localStorage.getItem('profile'));
            this.inscripcion = profile;
          }

        }
      }
  }, error => {
    alert('Ha ocurrido un error, por favor, intentelo nuevamente.')
    this.router.navigate(['/productos'])
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
  this.inscripcion.username = this.inscripcion.cedula;
  this.validadorService.inscripcion = this.inscripcion;
  const rCode = this.validadorService.validarDatos(this.fecha, this.logged);
  console.log(rCode);
  console.log(this.inscripcion);
  if(rCode === 0){
    const formData: FormData = new FormData();

    formData.append('_apellidos',this.inscripcion.apellidos);
    formData.append('_calle1',this.inscripcion.calle);
    formData.append('_calle2',this.inscripcion.calle2);
    formData.append('_cedula',this.inscripcion.cedula);
    formData.append('_email',this.inscripcion.email);
    formData.append('_direccion',this.inscripcion.direccion);
    formData.append('_estado',this.inscripcion.estadoCivil);
    formData.append('_fecha',this.inscripcion.fechaNaciemiento);
    formData.append('_instruccion',this.inscripcion.instruccion);
    formData.append('_lugarN',this.inscripcion.lugarNac);
    formData.append('_nacionalidad',this.inscripcion.nacionalidad);
    formData.append('_nombres',this.inscripcion.nombres);
    formData.append('_password',this.inscripcion.pass1);
    formData.append('_referencia',this.inscripcion.referencia);
    formData.append('_telefono',this.inscripcion.telefono);
    formData.append('_username',this.inscripcion.username);
    formData.append('_fpago',this.formaPago);
    //formData.append('_comprobante', this.comprobante, this.comprobante.name);
    formData.append('_servicio', ""+this.idServicio);
    console.log(this.inscripcion)
    this.loading = true;
    this.gotoTop()
    this.enviarFormulario(formData);

  }
}

enviarFormulario(formData){
  if(!this.logged){
    this.api.postFileInscripcion(formData).subscribe((data: ResponseTurnos) => {
      if(data.code==200){
        let form = new FormData();
        alert(data.data);
        form.append('_username',this.inscripcion.username);
        form.append('_password',this.inscripcion.pass1);
        localStorage.clear();
        this.auth.login(form);
      }else{
        alert(`Ha habido un error: ${data.data}`);
        this.loading = false;
      }
    }, error => {
      alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
      this.loading = false;
      console.log(error);
    });
  }else{
    this.api.agregarInscripcion(formData).subscribe((data: ResponseTurnos) => {
      if(data.code==200){
        alert(`Se ha enviado su solicitud correctamente.`);
        this.router.navigate(['perfil'])
      }else{
        alert(`${data.data}`);
        this.loading = false;
      }
    }, error => {
      alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
      this.loading = false;
      console.log(error);
    });
  }

}


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
