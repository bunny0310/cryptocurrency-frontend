import { TestBed } from '@angular/core/testing';

import { TransactionPoolMapService } from './transaction-pool-map.service';

describe('TransactionPoolMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionPoolMapService = TestBed.get(TransactionPoolMapService);
    expect(service).toBeTruthy();
  });
});
