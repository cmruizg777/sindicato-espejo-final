import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor  {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let jwt = localStorage.getItem('token');

        if (jwt) {

            //request.headers.append('Authorization',`Bearer ${jwt}`);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                }
            });

        }
        //console.log(request.headers)
        return next.handle(request);
    }
}
