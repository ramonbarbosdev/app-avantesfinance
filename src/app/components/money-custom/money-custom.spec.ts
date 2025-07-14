import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCustom } from './money-custom';

describe('MoneyCustom', () => {
  let component: MoneyCustom;
  let fixture: ComponentFixture<MoneyCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyCustom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
