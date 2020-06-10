import { TestBed } from '@angular/core/testing';

import { WalletInfoServiceService } from './wallet-info-service.service';

describe('WalletInfoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletInfoServiceService = TestBed.get(WalletInfoServiceService);
    expect(service).toBeTruthy();
  });
});
