import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service';
import { ValidadorService } from '../services/validador.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Inscripcion } from '../clases/inscripcion';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-turnero',
  templateUrl: './turnero.component.html',
  styleUrls: ['./turnero.component.css']
})
export class TurneroComponent implements OnInit {

  fecha: NgbDateStruct;
  fechaT: NgbDateStruct;

  fechaReference ;
  inscripcion: Inscripcion;
  comprobante = null;
  formaPago = 'TB';
  display2='';
  start: Date;
  cedulaValida = false;
  examen: any ;
  idServicio: Number;
  horarios : any[];
  horario: any;
  loading = true;
  logged = false;
  constructor(
    private validadorService: ValidadorService,
    private api: ApiRequestService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private auth: AuthService
  ) { }
  subs : Subscription;
  ngOnInit(): void {

    this.subs = this.auth.userStatus().subscribe( status => {
      if(status){
        this.loading = false;
        this.router.navigate(['/perfil'])
      }
    })

    this.inscripcion = new Inscripcion();/*
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
    this.fechaT = {
      day: (new Date()).getDate(),
      month: (new Date()).getMonth() + 1,
      year: (new Date()).getFullYear()
    }
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

    let fechaAux =  new Date();
    this.transformarFecha(fechaAux);
    this.start = new Date();
    const obs  =this.api.obtenerFecha().subscribe( (resp : ResponseTurnos) => {
      if(!resp.error){
          const aux = resp.data.split('-');
          this.fechaReference = new Date(resp.data);
          this.fecha  = { year: Number(aux[0]), month: Number(aux[1]) , day: Number(aux[2])};
          this.fechaT = { year: Number(aux[0]), month: Number(aux[1]) , day: Number(aux[2])};
      }else{
        alert('El servidor no ha respondido, intentelo más tarde')
      }
    });
    this.idServicio = this.rutaActiva.snapshot.params.id;
    this.api.obtenerCurso(this.idServicio, 1).subscribe((resp: ResponseTurnos)=>{
      console.log(resp);
      if(!resp.error){
        if(resp.data){
          this.examen = resp.data;
          if(this.examen.examen.tipo.codigo == 2){
            this.turnosInfo()
          }
        }
      }else{
        alert('Ha habido un error, por favor intentelo nuevamente, más tarde.')
      }
      this.loading = false;
    })

  }
  transformarFecha(fechaAux: Date){
    const anio = (fechaAux.getFullYear()).toString();
    const mes = fechaAux.getMonth() < 9 ? '0' + (fechaAux.getMonth() + 1).toString():(fechaAux.getMonth() + 1).toString();
    const dia = fechaAux.getDate() < 10 ? '0' + fechaAux.getDate().toString(): fechaAux.getDate().toString();
    //this.fecha = anio+"-"+mes+"-"+dia;
    this.fecha = {year: fechaAux.getFullYear(), month: fechaAux.getMonth() + 1 , day: fechaAux.getDate()};
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
  turnosInfo(){
    const strFecha = this.fechaT.year+'-'+this.fechaT.month+'-'+this.fechaT.day;
    const fr = new Date(strFecha);
    if(fr>=this.fechaReference){
      this.api.obtenerTurnosInfo(strFecha).subscribe((response: ResponseTurnos)=>{
        console.log(response)
        if(!response.error){
          if(response.code == 200){
            this.horarios = response.data;
          }
        }
      });
    }
  }

  enviar(){
    this.inscripcion.username = this.inscripcion.cedula;
    const rCode = this.validarDatos();
    if(rCode == 0){
      const formData: FormData = new FormData();
      formData.append('_apellidos',this.inscripcion.apellidos);
      formData.append('_calle1',this.inscripcion.calle);
      formData.append('_calle2',this.inscripcion.calle2);
      formData.append('_cedula',this.inscripcion.cedula);
      formData.append('_email',this.inscripcion.email);
      formData.append('_direccion',this.inscripcion.direccion);
      formData.append('_estado',this.inscripcion.estadoCivil);
      formData.append('_fecha',this.inscripcion.fechaNaciemiento);
      formData.append('_fechaT',this.fechaT.year+'-'+this.fechaT.month+'-'+this.fechaT.day);
      formData.append('_horario',this.horario);
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
      this.loading = true;
      this.enviarFormulario(formData);
    }
  }

  enviarFormulario(formData){
    if (!this.logged) {
      this.api.postFile(formData).subscribe((data: ResponseTurnos) => {
        if(data.code==200){
          alert('Su turno se ha almacenado correctamente, por favor espere el mensaje de confirmación en su correo.');
          localStorage.clear();
          let form = new FormData();
          form.append('_username',this.inscripcion.username);
          form.append('_password',this.inscripcion.pass1);
          this.auth.login(form);

        }else{
          alert(`Ha habido un error: ${data.data}`);
        }
        this.loading = false;
      }, error => {
        alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
        console.log(error);
        this.loading = false;
      });
    } else {
      this.api.agregarTurno(formData).subscribe((data: ResponseTurnos) => {
        if(data.code==200){
          alert('Su turno se ha almacenado correctamente, por favor espere el mensaje de confirmación en su correo.');
          this.router.navigate(['perfil'])

        }else{
          alert(`Ha habido un error: ${data.data}`);
        }
        this.loading = false;
      }, error => {
        alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
        console.log(error);
        this.loading = false;
      });
    }
  }

  handleFileInput(files: FileList) {
    this.comprobante = files.item(0);
  }

  validarDatos(): number {
    if(this.inscripcion.apellidos.trim() === '' && !this.logged){
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
    this.validarCedula();
    if(!this.cedulaValida  && !this.logged){
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
    if(!this.fecha  && !this.logged){
      this.inscripcion.errorFecha();
      return 8;
    }
    this.inscripcion.fechaNaciemiento = this.fecha.year +'-'+this.fecha.month+'-'+this.fecha.day;

    if(this.inscripcion.instruccion.trim() == ''){
      this.inscripcion.errorInstruccion();
      return 9;
    }
    if(this.inscripcion.lugarNac.trim() === ''  && !this.logged){
      this.inscripcion.errorLugarNac();
      return 10;
    }
    if(this.inscripcion.nacionalidad.trim() === ''  && !this.logged){
      this.inscripcion.errorNacionalidad();
      return 11;
    }
    if(this.inscripcion.nombres.trim() === ''  && !this.logged){
      this.inscripcion.errorNombres();
      return 12;
    }
    if (!this.logged){
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
    if(this.inscripcion.username.trim() == ''   && !this.logged){
      this.inscripcion.errorUsername1();
      return 17;
    }else{
      if(this.inscripcion.username.indexOf(' ')>=0   && !this.logged){
        this.inscripcion.errorUsername1();
        return 18;
      }
    }

    if(this.examen.examen.tipo.codigo == 2){
      if(!this.fechaT){
        alert('Debe elegir una fecha para el turno!');
        return 20;
      }
      if(!this.horario){
        alert('Debe elegir un horario para el Turno!');
        return 21;
      }
    }
    /*if(!this.comprobante){
      alert('Debe adjuntar la documentación y el pago requerido!');
      return 20;
    }*/

    return 0;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
  }
}
