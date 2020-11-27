import { Component, OnInit } from '@angular/core';
import { ResponseTurnos } from '../clases/response';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-filosofia',
  templateUrl: './filosofia.component.html',
  styleUrls: ['./filosofia.component.css']
})
export class FilosofiaComponent implements OnInit {

  html;
  constructor(
    private api: ApiRequestService
  ) { }

  ngOnInit(): void {
    /*this.api.obtenerFilosofiaSindicato().subscribe((resp: ResponseTurnos) => {
      this.html = resp.data;
      console.log(this.html);
    })*/
  }

}
