import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlocksService } from '../blocks.service';
import { Subject, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  public blockchainLoading;
  blockchain: [] = [];
  blockchainView: any = [];
  pageSize = 10;
  pageIndex = 0;
  blockchainSub: Subscription;
  @Output()
  page: EventEmitter<PageEvent>;

  hoverBlock: {} = {};
  constructor(public blocksService: BlocksService) { }

  setBlockchainView() {
    console.log(this.blockchain.length+'amy is hot');
    const prod = (this.pageIndex * this.pageSize);
    const length = this.blockchain.length;
    const end = (length >= prod + this.pageSize) ? prod + this.pageSize : length ;
    return this.blockchain.slice(prod, end);
  }
  populateBlockchain() {
    this.blocksService.getBlockchain();
    this.blockchainSub = this.blocksService.getBlockchainUpdateListener().subscribe((data) => {
      //console.log(data.blockchain);
      this.blockchain = data.blockchain;
      this.blockchainView = this.setBlockchainView();
      for (let i = 0; i < this.blockchain.length; ++i) {
        this.hoverBlock[i] = false;
      }
      this.blocksService.setLoading(false);
    });
  }

  onPageFired(event) {
    console.log("Jake AMy");
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.blockchainView = this.setBlockchainView();
    console.log(this.blockchainView.length);
  }
  ngOnInit() {
    this.blocksService.setLoading(true);
    this.populateBlockchain();
  }

}
