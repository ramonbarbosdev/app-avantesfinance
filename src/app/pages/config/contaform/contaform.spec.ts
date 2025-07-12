import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contaform } from './contaform';

describe('Contaform', () => {
  let component: Contaform;
  let fixture: ComponentFixture<Contaform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contaform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contaform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
