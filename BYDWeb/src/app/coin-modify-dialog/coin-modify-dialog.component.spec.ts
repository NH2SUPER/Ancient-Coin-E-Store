import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinModifyDialogComponent } from './coin-modify-dialog.component';

describe('CoinModifyDialogComponent', () => {
  let component: CoinModifyDialogComponent;
  let fixture: ComponentFixture<CoinModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinModifyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
