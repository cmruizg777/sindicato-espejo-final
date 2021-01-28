import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscripcion } from '../clases/inscripcion';
import { ApiRequestService } from '../services/api-request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {
  loaded = false;
  id ;
  inscripcion : Inscripcion ;
  constructor(
    private rutaActiva: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private api: ApiRequestService) { }


  ngOnInit(): void {
    this.loaded = true;
    this.id = this.rutaActiva.snapshot.params.id;
    this.auth.userStatus().subscribe( resp => {
      if(!resp){
        this.router.navigate(['/login']);
      }
    })
    this.api.obtenerInscripcion(this.id).subscribe( resp => {
      console.log(resp)
    })
  }

}
