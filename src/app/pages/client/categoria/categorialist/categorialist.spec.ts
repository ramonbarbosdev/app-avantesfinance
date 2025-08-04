import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorialist } from './categorialist';

describe('Categorialist', () => {
  let component: Categorialist;
  let fixture: ComponentFixture<Categorialist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categorialist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categorialist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
