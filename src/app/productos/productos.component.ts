import { Component, OnInit } from '@angular/core';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service'
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor( private api: ApiRequestService) { }

  cursos : any[];

  ngOnInit(): void {
    this.api.obtenerCursos().subscribe((resp: ResponseTurnos)=>{
        console.log(resp)
        if(!resp.error){
          this.cursos =  resp.data;
        }
    })
  }

}
