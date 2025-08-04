import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoriaform } from './categoriaform';

describe('Categoriaform', () => {
  let component: Categoriaform;
  let fixture: ComponentFixture<Categoriaform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoriaform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoriaform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
