import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiRequestService } from '../services/api-request.service';
import { Noticia } from '../clases/noticia'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: Observable<Noticia[]>;
  cedula = '';
  email = '';
  constructor(
    private api: ApiRequestService
  ) { }

  ngOnInit(): void {
    this.noticias = this.api.obtenerNoticias();
  }
  validarEmail(){

  }
}
