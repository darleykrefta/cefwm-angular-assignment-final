import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class JwtInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('TOKEN-PARKER-APP');
    if (jwt) {
      return next.handle(
        request.clone({
          headers: request.headers.set('Authorization', `Bearer ${jwt}`),
        })
      );
    }
    return next.handle(request);
  }
}
