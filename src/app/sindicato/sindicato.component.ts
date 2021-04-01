import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service';
import { LoadingService } from '../services/loading.service';

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
    private router: Router,
    private load: LoadingService,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    
    this.observer = this.activatedRoute.queryParams.subscribe(params => {
        this.load.setLoading(true);
        this.titulo = params.titulo;
        const plantilla = params.plantilla;
        const index = this.plantillas.indexOf(plantilla);
        if(index>=0){         
          
          const obs = this.api.obtenerPlantillaSindicato(plantilla).subscribe((resp:ResponseTurnos)=>{
            this.html = resp.data;
            console.log(resp)
            obs.unsubscribe();
            this.load.setLoading(false);
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

  loadData(){

  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {
      backdropClass: 'custom-backdrop',
      windowClass: 'loading-modal',
      centered: true,
    });
  }

}
