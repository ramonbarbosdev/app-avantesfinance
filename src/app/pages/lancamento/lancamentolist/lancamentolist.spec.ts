import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lancamentolist } from './lancamentolist';

describe('Lancamentolist', () => {
  let component: Lancamentolist;
  let fixture: ComponentFixture<Lancamentolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lancamentolist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lancamentolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
