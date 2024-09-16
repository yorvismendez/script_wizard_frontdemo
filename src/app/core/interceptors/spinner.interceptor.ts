import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  
    
  private totalRequests = 0;

  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.has('No-Loading')) {
      const modifiedReq = request.clone({
        headers: request.headers.delete('No-Loading')
      });
      return next.handle(modifiedReq);
    }

    
    this.totalRequests++;
    this.spinner.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          setTimeout(() => {
            this.spinner.hide();
          }, 250);
        }
      })
    );
  }
}