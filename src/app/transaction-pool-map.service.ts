import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Transaction } from './models/transaction.model';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionPoolMapService {

  constructor(private http: HttpClient) {}
  private transactionPoolMap: any;
  private transactionPoolMapUpdated = new Subject<{transactionPoolMap: {}}>();
  private transactionPoolMapSub: Subscription;

  getTransactionPoolMap() {
    this.http.get(environment.url + '/api/transaction-pool-map')
    .subscribe((data: any) => {
      this.transactionPoolMap = data.transactionPoolMap;
      this.transactionPoolMapUpdated.next({transactionPoolMap: data.transactionPoolMap});
      console.log(data);
    });
  }

  getTransactionPoolMapUpdateListener() {
    return this.transactionPoolMapUpdated.asObservable();
  }

  mineTransactions() {
    this.http.get(environment.url + '/api/mine-transactions').
    subscribe(() => {});
  }

  AddTransaction(transaction: Transaction) {
    this.http.post(environment.url + '/api/transact', transaction)
    .subscribe((data) => {
      console.log(data);
    });
  }
}
