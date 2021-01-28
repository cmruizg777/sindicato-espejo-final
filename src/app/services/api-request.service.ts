import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Usuario } from '../clases/usuario';
import { Inscripcion } from '../clases/inscripcion';
import { ResponseTurnos } from '../clases/response';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  obtenerTurnosInfo(fecha: string){
    const fechaObj = new Date(fecha);
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/info/turnos?_fecha=${fecha}`;
    //const url = `http://localhost:8000/api/info/turnos?_fecha=${fecha}`;
    return this.http.get(url);
  }
  obtenerServicios(){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/v1/servicio/`;
    //const url = `http://localhost:8000/api/v1/servicio/`;
    return this.http.get(url);
  }
  obtenerCurso(id, tipo){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/v1/servicio/curso?_id=${id}&_tipo=${tipo}`;
    //const url = `http://localhost:8000/api/v1/servicio/curso?_id=${id}&_tipo=${tipo}`;
    console.log(url);
    return this.http.get(url);
  }
  obtenerSocioInfo(cedula: string){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/info/socio?_cedula=${cedula}`;
    //const url = `http://localhost:8000/api/info/socio?_cedula=${cedula}`;
    return this.http.get(url);
  }
  postFile(formData) {
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/info/solicitud`;
    //const url = `http://localhost:8000/api/info/solicitud`;
    return this.http.post(url, formData);
  }
  postFileInscripcion(formData) {
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/v1/servicio/inscripcion`;
    //const url = `http://localhost:8000/api/v1/servicio/inscripcion`;
    return this.http.post(url, formData);
  }
  obtenerFecha(){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/info/date`;
    //const url = `http://localhost:8000/api/info/date`;
    return this.http.get(url);
  }
  obtenerPlantillaSindicato(plantilla){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/v1/sindicato?_plantilla=${plantilla}`;
    //const url = `http://localhost:8000/api/v1/sindicato?_plantilla=${plantilla}`;
    return this.http.get(url);
  }
  obtenerPlantillaEscuela(plantilla){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/v1/escuela/${plantilla}`;
    //const url = `http://localhost:8000/api/v1/escuela/${plantilla}`;
    return this.http.get(url);
  }
  obtenerToken(formData){
    //const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/user/login_check`;
    const url = `http://localhost:8000/api/user/login_check`;
    return this.http.post(url,formData);
  }
  obtenerPerfil(){
    //const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/user/profile`;
    const url = `http://localhost:8000/api/user/profile`;
    return this.http.get<Usuario>(url);
  }
  obtenerInscripcion(id){
    const url = `https://grupoprosoft.net/sindicato-api/public/index.php/api/v1/preinscripcion?_id=${id}`;
    //const url = `http://localhost:8000/api/user/profile`;
    return this.http.get<ResponseTurnos>(url);
  }
}
