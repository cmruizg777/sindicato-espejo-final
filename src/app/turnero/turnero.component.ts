import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service';
import { ValidadorService } from '../services/validador.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Inscripcion } from '../clases/inscripcion';

@Component({
  selector: 'app-turnero',
  templateUrl: './turnero.component.html',
  styleUrls: ['./turnero.component.css']
})
export class TurneroComponent implements OnInit {

  fecha: NgbDateStruct;

  private nativeElement : Node;


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
  constructor(
    private validadorService: ValidadorService,
    private api: ApiRequestService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) { }
  ngOnInit(): void {
    /*this.inscripcion = new Inscripcion();
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
    //this.inscripcion.tipoSangre*/


    let fechaAux =  new Date();
    this.transformarFecha(fechaAux);
    this.start = new Date();
    const obs  =this.api.obtenerFecha().subscribe( (resp : ResponseTurnos) => {
      if(!resp.error){
          const aux = resp.data.split('-');
          this.fecha = { year: Number(aux[0]), month: Number(aux[1]) , day: Number(aux[2])};
      }
      this.api.obtenerTurnosInfo(resp.data).subscribe((response: ResponseTurnos)=>{
        console.log(response)
        if(!response.error){
          if(response.code == 200){
            this.horarios = response.data;
          }
        }
      });
    });
    this.idServicio = this.rutaActiva.snapshot.params.id;
    this.api.obtenerCurso(this.idServicio, 1).subscribe((resp: ResponseTurnos)=>{
      console.log(resp);
      if(!resp.error){
        if(resp.data){
          this.examen = resp.data;
        }
      }
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
    /*const f1 = new Date(this.fecha.format());
      const f2 = new Date(this.fechaReference);
      if(f1 < f2){
        this.fecha = new Date(this.fechaReference);
        alert('Fecha no válida');
        console.log('no valida');
      }else{
        console.log('valida');
        this.api.obtenerTurnosInfo(this.fecha.format()).subscribe((response: ResponseTurnos)=>{
          console.log(response);
          if(!response.error){
            if(response.code == 200){
              this.horarios = response.data;
            }
          }else{
            alert('No se ha podido obtener respuestas del servidor, inténtelo más tarde.')
          }
        });
      }*/
  }

  enviar(){
    const rCode = this.validarDatos();
    if(rCode == 0){
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
    this.api.postFile(formData).subscribe((data: ResponseTurnos) => {
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

  handleFileInput(files: FileList) {
    this.comprobante = files.item(0);
  }

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
