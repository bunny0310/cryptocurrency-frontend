import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPoolMapComponent } from './transaction-pool-map.component';

describe('TransactionPoolMapComponent', () => {
  let component: TransactionPoolMapComponent;
  let fixture: ComponentFixture<TransactionPoolMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionPoolMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPoolMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
