import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competencialist } from './competencialist';

describe('Competencialist', () => {
  let component: Competencialist;
  let fixture: ComponentFixture<Competencialist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competencialist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competencialist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
