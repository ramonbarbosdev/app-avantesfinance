import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Centrocustoform } from './centrocustoform';

describe('Centrocustoform', () => {
  let component: Centrocustoform;
  let fixture: ComponentFixture<Centrocustoform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Centrocustoform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Centrocustoform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
