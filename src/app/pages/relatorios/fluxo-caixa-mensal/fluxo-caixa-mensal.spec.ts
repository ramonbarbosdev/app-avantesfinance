import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixaMensal } from './fluxo-caixa-mensal';

describe('FluxoCaixaMensal', () => {
  let component: FluxoCaixaMensal;
  let fixture: ComponentFixture<FluxoCaixaMensal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixaMensal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCaixaMensal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
