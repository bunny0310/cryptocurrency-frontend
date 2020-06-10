import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WalletInfoServiceService } from '../wallet-info-service.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import {TransactionPoolMapComponent} from '../transaction-pool-map/transaction-pool-map.component';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {
  walletInfo: {} = {};
  transactionPoolMap: {};
  private walletInfoSub: Subscription;
  constructor(public walletInfoService: WalletInfoServiceService) {}

  ngOnInit() {
    this.walletInfoService.getWalletInfo();
    this.walletInfoSub = this.walletInfoService.getWalletInfoUpdateListener().subscribe((data) => {
      this.walletInfo = data.walletInfo;
    });
  }

  submitForm(form) {
  }

}
