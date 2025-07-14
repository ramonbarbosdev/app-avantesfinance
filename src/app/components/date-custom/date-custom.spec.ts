import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCustom } from './date-custom';

describe('DateCustom', () => {
  let component: DateCustom;
  let fixture: ComponentFixture<DateCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateCustom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
