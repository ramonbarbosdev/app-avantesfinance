import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMovimentacao } from './table-movimentacao';

describe('TableMovimentacao', () => {
  let component: TableMovimentacao;
  let fixture: ComponentFixture<TableMovimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMovimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMovimentacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
