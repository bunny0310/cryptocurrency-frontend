import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlocksService } from '../blocks.service';
import { Subscription } from 'rxjs';
import { WalletInfoServiceService } from '../wallet-info-service.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  blockchainSub: Subscription;
  blockchain: [] = [];
  block: any;
  id;
  walletInfoSub: Subscription;
  walletInfo;

  constructor(private route: ActivatedRoute, private blocksService: BlocksService,
  public walletInfoService: WalletInfoServiceService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.blocksService.setLoading(true);
    this.populateBlockchain();
    this.walletInfoService.getWalletInfo();
    this.walletInfoSub = this.walletInfoService.getWalletInfoUpdateListener().subscribe((data) => {
      this.walletInfo = data.walletInfo;
    });
  }
  populateBlockchain() {
    this.blocksService.getBlockchain();
    this.blockchainSub = this.blocksService.getBlockchainUpdateListener().subscribe((data) => {
      this.blockchain = data.blockchain;
      this.blocksService.setLoading(false);
      this.setBlock();
    });
  }
  getId() {
    return Number(this.id) + 1;
  }

  setBlock() {
    this.block = this.blockchain[this.id];
    let rewardCount = 0;
    let transactCount = 0;
    for (const transaction of this.block.data) {
        if (transaction.input.address === '*authorized-reward*') {
          rewardCount++;
        } else {
          transactCount++;
        }
    }
    this.block['rewardCount'] = rewardCount;
    this.block['transactCount'] = transactCount;
  }

}
