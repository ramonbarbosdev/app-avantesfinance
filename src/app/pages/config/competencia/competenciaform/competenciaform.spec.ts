import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competenciaform } from './competenciaform';

describe('Competenciaform', () => {
  let component: Competenciaform;
  let fixture: ComponentFixture<Competenciaform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competenciaform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competenciaform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
