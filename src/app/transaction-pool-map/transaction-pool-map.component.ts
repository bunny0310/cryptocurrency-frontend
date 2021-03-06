import { Component, OnInit, Output, OnChanges, ɵɵNgOnChangesFeature, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TransactionPoolMapService } from '../transaction-pool-map.service';
import { Subscription } from 'rxjs';
import {Transaction} from '../models/transaction.model';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { BlocksService } from '../blocks.service';

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
  constructor(public transactionPoolMapService: TransactionPoolMapService, private changeDetectorRefs: ChangeDetectorRef,
  private blocksService: BlocksService
    ) {
  }
   timeOutForMap = setInterval(() => {
     if (this.transactionPoolMapService.updateMap === true) {
      this.populateTransactionPoolMap();
      this.transactionPoolMapService.updateMap = false;
     }
    }, 1000);
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
      this.blocksService.setLoading(false);
      this.transactionPoolMapService.updateMap = false;
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
    console.log(this.transactionPoolMap);
  }

  mineTransactions() {
    this.blocksService.setLoading(true);
    this.blocksService.setIsMining(true);
    this.transactionPoolMapService.mineTransactions();
    this.populateTransactionPoolMap();
  }

}
