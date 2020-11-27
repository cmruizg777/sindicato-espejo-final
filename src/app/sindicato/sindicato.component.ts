import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-sindicato',
  templateUrl: './sindicato.component.html',
  styleUrls: ['./sindicato.component.css']
})
export class SindicatoComponent implements OnInit {

  plantillas = [
    'filosofia',
    'historia',
    'secretarios',
    'autoridades',
    'socios',
    'baselegal',
    'convenios',
    'sindicalizacion',
    'noticias',
    'servicios'
  ]
  observer: Subscription ;
  titulo = '';
  html;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiRequestService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.observer = this.activatedRoute.queryParams.subscribe(params => {
        console.log(params)
        this.titulo = params.titulo;
        const plantilla = params.plantilla;
        const index = this.plantillas.indexOf(plantilla);
        if(index>=0){
          const obs = this.api.obtenerPlantillaSindicato(plantilla).subscribe((resp:ResponseTurnos)=>{
            this.html = resp.data;
            console.log(resp)
            obs.unsubscribe();
          })
        }else{
          this.router.navigate(['/']);
        }
    })
    /*const plantilla  = this.activatedRoute.snapshot.params.plantilla;
    const titulo  = this.activatedRoute.snapshot.params.titulo;
    if(plantilla!==this.ruta){
      this.ruta = plantilla;
      this.titulo = titulo;
      const index = this.plantillas.indexOf(plantilla);
      if(index>=0){
        const obs = this.api.obtenerPlantillaSindicato(plantilla).subscribe((resp:ResponseTurnos)=>{
          this.html = resp.data;
          console.log(resp)
          obs.unsubscribe();
        })
      }else{
        //this.router.navigate(['/']);
      }
    }*/

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    try{
      this.observer.unsubscribe();
    }catch{

    }
  }

}
