import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Transaction } from './models/transaction.model';
import { environment } from './environment';
import { BlocksService } from './blocks.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionPoolMapService {

  constructor(private http: HttpClient, private blocksService: BlocksService) {}
  private transactionPoolMap: any;
  private transactionPoolMapUpdated = new Subject<{transactionPoolMap: {}}>();
  private transactionPoolMapSub: Subscription;
  public updateMap =  false;

  getTransactionPoolMap() {
    this.http.get(environment.url + '/api/transaction-pool-map', {observe: 'response'})
    .subscribe((data: any) => {
      console.log(data.status +'ishaan');
      if (data.status === 503) {
        this.blocksService.setIsMining(true);
      }
      this.transactionPoolMap = data.body.transactionPoolMap;
      this.transactionPoolMapUpdated.next({transactionPoolMap: data.body.transactionPoolMap});
      //console.log(data);
    });
  }

  getTransactionPoolMapUpdateListener() {
    return this.transactionPoolMapUpdated.asObservable();
  }

  mineTransactions() {
    this.http.get(environment.url + '/api/mine-transactions', {observe: 'response'}).
    subscribe((data) => {
      if (data.status === 503) {
        this.blocksService.setIsMining(true);
      }
      this.blocksService.setLoading(false);
    });
  }

  AddTransaction(transaction: Transaction) {
    this.http.post(environment.url + '/api/transact', transaction, {observe: 'response'})
    .subscribe((data) => {
      if (data.status === 503) {
        this.blocksService.setIsMining(true);
      }
      console.log(data.body);
      this.updateMap = true;
    });
  }
}
