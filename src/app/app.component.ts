import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ruta } from './clases/ruta'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sindicato-espejo-final';
  constructor(private router: Router){

  }

  navigateTo(componente, titulo, plantilla){

    this.router.navigate(['/sindicato']).then();
  }
}
