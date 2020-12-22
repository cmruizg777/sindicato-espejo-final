import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario:Usuario;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('profile'));
  }

}
