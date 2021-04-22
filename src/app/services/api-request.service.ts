import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Usuario } from '../clases/usuario';
import { Inscripcion } from '../clases/inscripcion';
import { ResponseTurnos } from '../clases/response';
import { Noticia } from '../clases/noticia';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  uri = 'https://grupoprosoft.net/sindicato-api/public/index.php/api';
  //uri = 'http://localhost:8000/api';
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  obtenerTurnosInfo(fecha: string){
    const fechaObj = new Date(fecha);
    const url = `${this.uri}/info/turnos?_fecha=${fecha}`;
    //const url = `${this.uri}/info/turnos?_fecha=${fecha}`;
    return this.http.get(url);
  }
  obtenerServicios(){
    const url = `${this.uri}/v1/servicio/`;
    //const url = `${this.uri}/v1/servicio/`;
    return this.http.get(url);
  }
  obtenerCurso(id, tipo){
    const url = `${this.uri}/v1/servicio/curso?_id=${id}&_tipo=${tipo}`;
    //const url = `${this.uri}/v1/servicio/curso?_id=${id}&_tipo=${tipo}`;
    console.log(url);
    return this.http.get(url);
  }
  obtenerSocioInfo(cedula: string){
    const url = `${this.uri}/info/socio?_cedula=${cedula}`;
    //const url = `${this.uri}/info/socio?_cedula=${cedula}`;
    return this.http.get(url);
  }
  postFile(formData) {
    const url = `${this.uri}/v1/servicio/solicitud`;
    //const url = `${this.uri}/v1/servicio/solicitud`;
    return this.http.post(url, formData);
  }
  enviarRequisitos(formData) {
    const url = `${this.uri}/v1/preinscripciones/documentos`;
    //const url = `${this.uri}/v1/preinscripciones/documentos`;
    return this.http.post(url, formData);
  }
  postFileInscripcion(formData) {
    const url = `${this.uri}/v1/servicio/inscripcion`;
    //const url = `${this.uri}/v1/servicio/inscripcion`;
    return this.http.post(url, formData);
  }
  agregarInscripcion(formData) {
    const url = `${this.uri}/v1/servicio/inscripcion/add`;
    //const url = `${this.uri}/v1/servicio/inscripcion`;
    return this.http.post(url, formData);
  }
  agregarTurno(formData) {
    const url = `${this.uri}/v1/servicio/solicitud/add`;
    //const url = `${this.uri}/v1/servicio/solicitud`;
    return this.http.post(url, formData);
  }
  obtenerFecha(){
    const url = `${this.uri}/info/date`;
    //const url = `${this.uri}/info/date`;
    return this.http.get(url);
  }
  obtenerPlantillaSindicato(plantilla){
    const url = `${this.uri}/v1/sindicato?_plantilla=${plantilla}`;
    //const url = `${this.uri}/v1/sindicato?_plantilla=${plantilla}`;
    return this.http.get(url);
  }
  obtenerNoticias(){
    const url = `${this.uri}/v1/sindicato/noticias`;
    //const url = `${this.uri}/v1/sindicato/noticias`;
    return this.http.get<Noticia[]>(url);
  }
  obtenerPlantillaEscuela(plantilla){
    const url = `${this.uri}/v1/escuela/${plantilla}`;
    //const url = `${this.uri}/v1/escuela/${plantilla}`;
    return this.http.get(url);
  }
  obtenerToken(formData){
    const url = `${this.uri}/user/login_check`;
    //const url = `${this.uri}/user/login_check`;
    return this.http.post(url,formData);
  }
  obtenerPerfil(){
    const url = `${this.uri}/user/profile`;
    //const url = `${this.uri}/user/profile`;
    return this.http.get<Usuario>(url);
  }
  obtenerInscripcion(id){
    const url = `${this.uri}/v1/preinscripciones?_id=${id}`;
    //const url = `${this.uri}/user/profile`;
    return this.http.get<ResponseTurnos>(url);
  }

  resetPassword(form){
    const url = `${this.uri}/user/reset-password`;
    //const url = `${this.uri}/user/login_check`;
    return this.http.post(url,form);
  }
}
