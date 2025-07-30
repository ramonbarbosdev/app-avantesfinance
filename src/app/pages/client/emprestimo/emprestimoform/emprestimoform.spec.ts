import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emprestimoform } from './emprestimoform';

describe('Emprestimoform', () => {
  let component: Emprestimoform;
  let fixture: ComponentFixture<Emprestimoform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emprestimoform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emprestimoform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
