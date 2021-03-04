import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario:Usuario;
  profile: Subscription;
  loaded = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.profile = this.auth.userProfile().subscribe( resp => {
      if(resp){
        this.usuario = JSON.parse(localStorage.getItem('profile'));
      }else{
        this.profile.unsubscribe();
        this.auth.logout();
      }
      this.loaded = true;
    })
    this.auth.getProfile();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.profile.unsubscribe();
  }

}
