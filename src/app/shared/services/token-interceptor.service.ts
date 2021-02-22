import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private sessionStorageService: SessionStorageService, private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sessionStorageService) {
      const clonedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.sessionStorageService.Token) });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status == 401) {
              this.router.navigateByUrl('/login');
            } else if (err.status == 403) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }

}
