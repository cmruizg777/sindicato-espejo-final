import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../services/api-request.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private api: ApiRequestService,
    private storage: LocalStorageService,
    private router: Router,
    private auth: AuthService) { }
    subs : Subscription;
    loading = false;
  ngOnInit(): void {
    this.subs = this.auth.userStatus().subscribe( status => {
      if(status){
        this.router.navigate(['/perfil'])
      }
      this.loading = false;
    })
  }

  login(){

    if(this.username && this.password){
      localStorage.clear();
      let form = new FormData();
      form.append('_username',this.username);
      form.append('_password',this.password);
      this.loading = true;
      this.auth.login(form);
    }

  }

}
