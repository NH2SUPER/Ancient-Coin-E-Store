import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinListPageComponent } from './coin-list-page.component';

describe('CoinListPageComponent', () => {
  let component: CoinListPageComponent;
  let fixture: ComponentFixture<CoinListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
