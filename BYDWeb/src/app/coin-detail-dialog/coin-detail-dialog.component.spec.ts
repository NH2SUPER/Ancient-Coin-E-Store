import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDetailDialogComponent } from './coin-detail-dialog.component';

describe('CoinDetailDialogComponent', () => {
  let component: CoinDetailDialogComponent;
  let fixture: ComponentFixture<CoinDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
