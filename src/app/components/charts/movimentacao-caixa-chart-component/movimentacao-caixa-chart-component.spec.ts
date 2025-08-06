import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoCaixaChartComponent } from './movimentacao-caixa-chart-component';

describe('MovimentacaoCaixaChartComponent', () => {
  let component: MovimentacaoCaixaChartComponent;
  let fixture: ComponentFixture<MovimentacaoCaixaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacaoCaixaChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentacaoCaixaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
