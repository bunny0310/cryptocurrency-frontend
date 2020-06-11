import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { BlocksService } from './blocks.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

constructor(public blocksService: BlocksService) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
return next.handle(request)
.pipe(
  timeout(500),
  catchError( (error: HttpErrorResponse) => {
     let errMsg = '';
     // Client Side Error
     if (error.error instanceof ErrorEvent) {
       errMsg = `Error: ${error.error.message}`;
     } else {  // Server Side Error
       errMsg = `Error Code: ${error},  Message: ${error.message}`;
       this.blocksService.setIsMining(true);
       this.blocksService.setLoading(false);
     }
     return throwError(errMsg);
   })
);
}
}
