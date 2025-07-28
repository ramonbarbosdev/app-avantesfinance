import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixaDiario } from './fluxo-caixa-diario';

describe('FluxoCaixaDiario', () => {
  let component: FluxoCaixaDiario;
  let fixture: ComponentFixture<FluxoCaixaDiario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixaDiario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCaixaDiario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
