import { Component, Input, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { Inscripcion } from '../clases/inscripcion';
import { AuthService } from '../services/auth.service';
import { ValidadorService } from '../services/validador.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  fecha: NgbDateStruct;
  fechaReference ;
  @Input() inscripcion: Inscripcion;
  comprobante = null;
  formaPago = 'TB';
  display2='';
  start: Date;
  cedulaValida = false;
  curso: any ;
  idServicio: Number;
  loading = true;
  minDate;
  maxDate;
  @Input() logged = false;
  constructor(
    private validadorService: ValidadorService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.fecha  = {
      day: 17,
      month: 9,
      year: 1990
    };
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  validarCedula(){
    if(this.inscripcion.cedula){
      if(this.inscripcion.cedula.trim().length == 10){
        const resp  = this.validadorService.validarCedula(this.inscripcion.cedula);
        this.cedulaValida = resp;
      }else{
        this.cedulaValida = false;
      }
    }
    if(!this.cedulaValida){
      alert('Cédula no válida')
    }
  }

}
