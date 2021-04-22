import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  username:string;
  constructor(
    private api: ApiRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  send(){

    if(this.username){
      localStorage.clear();
      let form = new FormData();
      form.append('_username',this.username);
      this.api.resetPassword(form).subscribe((response: any)=>{
        alert(response.message)
        this.router.navigate(['/login']);
      });
    }

  }
}
