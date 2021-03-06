import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisculpasComponent } from './disculpas/disculpas.component';
import { FilosofiaComponent } from './filosofia/filosofia.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { ExamenPsicosensometricoComponent } from './examen-psicosensometrico/examen-psicosensometrico.component';
import { ExamenPsicologicoComponent } from './examen-psicologico/examen-psicologico.component';
import { ExamenMedicoComponent } from './examen-medico/examen-medico.component';
import { TurneroComponent } from './turnero/turnero.component';
import { ProductosComponent } from './productos/productos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './perfil/perfil.component';
import { EscuelaComponent } from './escuela/escuela.component';
import { SindicatoComponent } from './sindicato/sindicato.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisculpasComponent,
    FilosofiaComponent,
    InscripcionComponent,
    MatriculaComponent,
    ExamenPsicosensometricoComponent,
    ExamenPsicologicoComponent,
    ExamenMedicoComponent,
    TurneroComponent,
    ProductosComponent,
    LoginComponent,
    PerfilComponent,
    EscuelaComponent,
    SindicatoComponent,
    DatosPersonalesComponent,
    ResetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
