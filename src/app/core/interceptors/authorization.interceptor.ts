import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    const token = localStorage.getItem('token') ?? '';

    
    if (token != null && req.url != `${environment.baseUrl}/login`) {
      const accessToken = token;
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + accessToken),
      });
    }
    
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
