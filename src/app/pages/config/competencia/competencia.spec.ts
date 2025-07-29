import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competencia } from './competencia';

describe('Competencia', () => {
  let component: Competencia;
  let fixture: ComponentFixture<Competencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
