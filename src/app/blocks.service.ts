import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  constructor(private http: HttpClient) {}
  private blockchain: {};
  loading = false;
  private blockchainUpdated = new Subject<{blockchain: any}>();

  setLoading(value: boolean) {
    this.loading = value;
  }
  getLoading() {
    return this.getLoading;
  }
  getBlockchain() {
    this.http.get('http://localhost:3000/api/blocks')
    .subscribe((data) => {
      this.blockchain = data;
      this.blockchainUpdated.next({blockchain: data});
      console.log(data);
    });
  }

  getBlockchainUpdateListener() {
    return this.blockchainUpdated.asObservable();
  }
}
