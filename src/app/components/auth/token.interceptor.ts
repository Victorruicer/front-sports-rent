import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("interceptando peticion:" + request.url);
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if(currentUser != null && isApiUrl){
      const token: string = currentUser.Token;
        //añadimos autorización con token en la cabecera
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( err );

      })
    );
  }
}

