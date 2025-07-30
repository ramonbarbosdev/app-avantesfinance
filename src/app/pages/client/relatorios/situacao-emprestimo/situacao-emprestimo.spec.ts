import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoEmprestimo } from './situacao-emprestimo';

describe('SituacaoEmprestimo', () => {
  let component: SituacaoEmprestimo;
  let fixture: ComponentFixture<SituacaoEmprestimo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituacaoEmprestimo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacaoEmprestimo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
