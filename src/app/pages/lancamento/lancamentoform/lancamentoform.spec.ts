import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lancamentoform } from './lancamentoform';

describe('Lancamentoform', () => {
  let component: Lancamentoform;
  let fixture: ComponentFixture<Lancamentoform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lancamentoform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lancamentoform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
