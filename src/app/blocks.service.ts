import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  constructor(private http: HttpClient) {}
  private blockchain: {};
  loading = false;
  public isMining = false;
  private blockchainUpdated = new Subject<{blockchain: any}>();

  setLoading(value: boolean) {
    this.loading = value;
  }
  getLoading() {
    return this.getLoading;
  }
  setIsMining(value: boolean) {
    this.isMining = value;
  }
  getIsMining() {
    return this.getLoading;
  }
  getBlockchain() {
    this.http.get(environment.url + '/api/blocks', {observe: 'response'})
    .subscribe((data) => {
      if (data.status === 503) {
        this.setIsMining(true);
      }
      this.blockchain = data.body;
      this.blockchainUpdated.next({blockchain: data.body});
      console.log(data);
    });
  }

  getBlockchainUpdateListener() {
    return this.blockchainUpdated.asObservable();
  }
}
