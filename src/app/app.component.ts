import { Component, HostListener } from '@angular/core';
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
  show = false;
  toggle = '';
  target = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiRequestService) {
      this.usuario = null;
      router.events.subscribe(() => {
        this.gotoTop();
      });
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let w = window.innerWidth;
    this.setCollapseTarget(w);

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
  show_hide(){
    console.log('hola')
  }
  @HostListener('window:resize', ['$event'])
  onresize(event){
    let w = event.target.innerWidth
    this.setCollapseTarget(w);
  }
  setCollapseTarget(width){
    if(width <= 992){
      this.toggle = 'collapse';
      this.target = '.navbarNavDropdown';
    }else{
      this.toggle = '';
      this.target = '';
    }
  }
}
