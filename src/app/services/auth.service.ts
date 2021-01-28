import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthResponse } from '../clases/auth';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged$ = new Subject<boolean>();
  profile$ = new Subject<boolean>();
  state = false;
  constructor(
    private api: ApiRequestService,
    private router: Router
  ) {

  }
  login(form: FormData){
    this.api.obtenerToken(form).subscribe( (r : AuthResponse) => {
      //console.log(r)
      if(r.token){

        localStorage.setItem('token', r.token);
        let d1 = new Date (), d2 = new Date ( d1 );
        d2.setMinutes ( d1.getMinutes() + 60 );
        localStorage.setItem('date',''+d2.toISOString());
        //this.getProfile();
        this.state = true;
      }else{
        this.state = false;
        alert(r.message);
      }
      this.logged$.next(this.state);
  }, error => {
    alert('Ah ocurrido un error, intentelo nuevamente');
    this.logged$.next(this.state);
    console.log(error)
  })
  }
  getProfile(){
    this.api.obtenerPerfil().subscribe( user => {
      console.log('info', user)
      if(user.username){
        localStorage.setItem('profile', JSON.stringify(user));
        this.profile$.next(true);
      }else{
        this.profile$.next(false);
      }
    })
  }
  userStatus(){
    return this.logged$.asObservable();
  }
  userProfile(){
    return this.profile$.asObservable();
  }
  checkStatus(){
    const token = localStorage.getItem('token');
    const strDate = localStorage.getItem('date');
    const profile = localStorage.getItem('profile');
    this.state = false;
    if(token && strDate && profile){
      let d1 = new Date(strDate);
      let d2 = new Date();
      if(d1 > d2){
        this.state = true;
        this.profile$.next(true);
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('date');
        localStorage.removeItem('profile');
        this.profile$.next(false);
      }
    }
    this.logged$.next(this.state);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    this.state=false;
    this.profile$.next(false);
    return this.logged$.next(this.state);
  }
}

