import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css']
})
export class EscuelaComponent implements OnInit {

  plantillas = [
    'filosofia',
    'historia',
    'personal',
    'parque',
    'servicios',
    'oferta',
  ]
  html;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiRequestService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const plantilla  = this.activatedRoute.snapshot.params.plantilla;
    const index = this.plantillas.indexOf(plantilla);
    if(index>=0){
      this.api.obtenerPlantillaEscuela(plantilla).subscribe((resp:ResponseTurnos)=>{
        if(!resp.error){
          this.html=resp.data;
        }
      })
    }else{
      this.router.navigate(['/']);
    }

  }

}
