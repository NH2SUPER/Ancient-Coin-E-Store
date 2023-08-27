import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoinPageComponent } from './new-coin-page.component';

describe('NewCoinPageComponent', () => {
  let component: NewCoinPageComponent;
  let fixture: ComponentFixture<NewCoinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoinPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCoinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
