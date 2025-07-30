import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculoCliente } from './vinculo-cliente';

describe('VinculoCliente', () => {
  let component: VinculoCliente;
  let fixture: ComponentFixture<VinculoCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinculoCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinculoCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
