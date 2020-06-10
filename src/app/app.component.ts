import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, Event } from '@angular/router';
import { BlockComponent } from './block/block.component';
import { BlocksService } from './blocks.service';
import { WalletInfoServiceService } from './wallet-info-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  loading;
  walletInfo: {};
  walletInfoSub: Subscription;
  walletTimeOut = setInterval(() => this.getWalletInfo(), 1000);
  getWalletInfo() {
    this.walletInfoService.getWalletInfo();
    this.walletInfoSub = this.walletInfoService.getWalletInfoUpdateListener().subscribe((data) => {
      this.walletInfo = data.walletInfo;
    });
  }
   ngOnInit() {
    this.getWalletInfo();
  }

  ngOnDestroy() {
    clearInterval(this.walletTimeOut);
  }

  constructor(public router: Router, public blocksService: BlocksService, public walletInfoService: WalletInfoServiceService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }
}
