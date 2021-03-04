import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisculpasComponent } from './disculpas/disculpas.component';
import { FilosofiaComponent } from './filosofia/filosofia.component';
import { HomeComponent } from './home/home.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { TurneroComponent } from './turnero/turnero.component';
import { SindicatoComponent } from './sindicato/sindicato.component';
import { EscuelaComponent } from './escuela/escuela.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UserGuard } from './guards/user.guard';
import { MatriculaComponent } from './matricula/matricula.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  //{path: 'filosofia', component: FilosofiaComponent },
  {path: '404', component: DisculpasComponent },
  {path: 'servicios', component: ProductosComponent },
  {path: 'inscripcion/:id', component: InscripcionComponent },
  {path: 'matricula/:id', component: MatriculaComponent, canActivate: [UserGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'perfil', component: PerfilComponent, canActivate: [UserGuard]},
  {path: 'turnos/:id', component: TurneroComponent },
  {path: 'sindicato', component: SindicatoComponent },
  {path: 'escuela', component: EscuelaComponent },

  //{path: '', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
