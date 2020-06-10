import { Component, OnInit, Output, OnChanges, ɵɵNgOnChangesFeature, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TransactionPoolMapService } from '../transaction-pool-map.service';
import { Subscription } from 'rxjs';
import {Transaction} from '../models/transaction.model';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material';

export interface TransactionMap {
  id: string;
  outputMap: {};
  input: {};
}

@Component({
  selector: 'app-transaction-pool-map',
  templateUrl: './transaction-pool-map.component.html',
  styleUrls: ['./transaction-pool-map.component.css']
})

export class TransactionPoolMapComponent implements OnInit, OnDestroy{
  transactionPoolMap: {};
  transactionPoolMapData: TransactionMap[] = [];
  displayedColumns: string[] = ['id', 'outputMap', 'input'];
  private transactionPoolMapSub: Subscription;
  constructor(public transactionPoolMapService: TransactionPoolMapService, private changeDetectorRefs: ChangeDetectorRef) {
  }
  timeOutForMap = setInterval(() => this.populateTransactionPoolMap(), 1000);
  populateTransactionPoolMap() {
    const dataSource: TransactionMap[] = [];
    this.transactionPoolMapService.getTransactionPoolMap();
    this.transactionPoolMapSub = this.transactionPoolMapService.getTransactionPoolMapUpdateListener().subscribe((data) => {
      this.transactionPoolMap = data.transactionPoolMap;
      for (const key of Object.keys(this.transactionPoolMap)) {
        const obj: TransactionMap = {id: key, outputMap: this.transactionPoolMap[key].outputMap, input: this.transactionPoolMap[key].input};
        dataSource.push(obj);
      }
      this.transactionPoolMapData = dataSource;
    });
  }
  ngOnInit() {
      this.populateTransactionPoolMap();
  }

  ngOnDestroy() {
    clearInterval(this.timeOutForMap);
  }

  setTransaction(form: NgForm) {
    const recipient = form.value.recipient;
    const amount = form.value.amount;
    const transaction: Transaction = {
      amount, recipient
    };
    this.transactionPoolMapService.AddTransaction(transaction);
    this.populateTransactionPoolMap();
    console.log(this.transactionPoolMap);
  }

  mineTransactions() {
    this.transactionPoolMapService.mineTransactions();
    this.populateTransactionPoolMap();
  }

}
