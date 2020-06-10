import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletInfoServiceService {

  constructor(private http: HttpClient) {}
  private walletInfo: {};
  private walletInfoUpdated = new Subject<{walletInfo: {}}>();

  getWalletInfo() {
    this.http.get('http://localhost:3000/api/wallet-info')
    .subscribe((data) => {
      this.walletInfo = data;
      this.walletInfoUpdated.next({walletInfo: data});
      console.log(data);
    });
  }
  getWalletInfoUpdateListener() {
    return this.walletInfoUpdated.asObservable();
  }
}
