import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emprestimodetalheform } from './emprestimodetalheform';

describe('Emprestimodetalheform', () => {
  let component: Emprestimodetalheform;
  let fixture: ComponentFixture<Emprestimodetalheform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emprestimodetalheform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emprestimodetalheform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
