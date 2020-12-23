import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ruta } from './clases/ruta'
import { AuthService } from './services/auth.service';
import { Usuario } from './clases/usuario';
import { ApiRequestService } from './services/api-request.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sindicato-espejo-final';
  logged : boolean;
  usuario: Usuario ;
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiRequestService) {
      this.usuario = null;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.auth.userProfile().subscribe( resp => {
      //console.log(resp)
      if(resp){
        this.router.navigate(['/perfil'])
        this.usuario = JSON.parse(localStorage.getItem('profile'));
      }else{
        this.usuario = null;
      }
    })
    this.auth.userStatus().subscribe( resp => {
      this.logged=resp;
    });
    this.auth.checkStatus();

  }
  logout(){
    this.auth.logout();
  }

}