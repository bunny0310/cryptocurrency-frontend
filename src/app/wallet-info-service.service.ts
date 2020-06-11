import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { environment } from './environment';
import { BlocksService } from './blocks.service';
import {catchError, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletInfoServiceService {

  constructor(private http: HttpClient, public blocksService: BlocksService) {}
  private walletInfo: {};
  private walletInfoUpdated = new Subject<{walletInfo: {}}>();

  getWalletInfo() {
    this.http.get(environment.url + '/api/wallet-info', {observe: 'response'})
    .subscribe((data) => {
      this.walletInfo = data.body;
      this.walletInfoUpdated.next({walletInfo: data.body});
    });
  }
  getWalletInfoUpdateListener() {
    return this.walletInfoUpdated.asObservable();
  }

  handleError(error) {

    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
 
      // client-side error
 
      errorMessage = `Error: ${error.error.message}`;
 
    } else {
 
      // server-side error
 
 
    }
 
  
 
    return throwError(errorMessage);
 
  }
}
