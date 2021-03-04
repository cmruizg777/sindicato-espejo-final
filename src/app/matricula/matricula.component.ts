import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscripcion } from '../clases/inscripcion';
import { Preinscripcion } from '../clases/preinscripcion';
import { Requisito } from '../clases/requisito';
import { ApiRequestService } from '../services/api-request.service';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash';
import { ResponseTurnos } from '../clases/response';
import { Documento } from '../clases/documento';
@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {
  loaded = false;
  id ;
  inscripcion : Preinscripcion ;
  documentos  = [];
  counter = 0;
  constructor(
    private rutaActiva: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private api: ApiRequestService) { }


  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params.id;
    this.auth.userStatus().subscribe( resp => {
      if(!resp){
        this.router.navigate(['/login']);
      }
    })
    this.api.obtenerInscripcion(this.id).subscribe( resp => {
      if (!resp.error){
        console.log(resp.data)
        this.inscripcion = resp.data[0];
        this.inscripcion.documentos.forEach((doc: Documento)=>{
          const id = doc.requisito.id;
          let documento = {'id': doc.requisito.id , documento: null };
          this.documentos.push(documento);
        });
      }
      this.loaded = true;
    }, error => {
      this.loaded = true
      console.log(error)
    })
  }
  handleFileInput(files: FileList, id) {
    let req = _.find(this.documentos, {id});
    req.documento = files.item(0);
    this.counter ++ ;
  }
  enviar(){
    if(this.counter>0){
      let form = new FormData();
      form.append('_id', this.inscripcion.id+'');
      this.documentos.forEach((req)=>{
        if (req.documento){
          form.append('_'+req.id, req.documento);
          req.documento = null;
          this.counter = 0;
        }
      });
      this.loaded = false;
      this.api.enviarRequisitos(form).subscribe( (resp: ResponseTurnos) => {
        this.loaded = true;
        if(resp.error){
          alert(resp.data);
        }else{
          alert('Sus documentos se han enviado correctamente.');
        }
        console.log(resp)
      }, error => {
        alert('Ha ocurrido un error, intentelo nuevamente, mas tarde.')
        console.log(error);
        this.loaded = true;
      })
    }else{
      alert('¡Al menos debe subir un comprobante!');
    }
  }
}
