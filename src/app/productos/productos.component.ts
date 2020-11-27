import { Component, OnInit } from '@angular/core';
import { ResponseTurnos } from '../clases/response';
import { Servicio} from '../clases/servicio';
import { ApiRequestService } from '../services/api-request.service'
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor( private api: ApiRequestService) { }

  servicios : any;

  ngOnInit(): void {
    this.api.obtenerServicios().subscribe((resp: ResponseTurnos)=>{
        if(!resp.error){
          this.servicios =  resp.data;
        }
    })
  }

}
