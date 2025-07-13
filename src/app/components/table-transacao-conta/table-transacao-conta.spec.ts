import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTransacaoConta } from './table-transacao-conta';

describe('TableTransacaoConta', () => {
  let component: TableTransacaoConta;
  let fixture: ComponentFixture<TableTransacaoConta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTransacaoConta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTransacaoConta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
