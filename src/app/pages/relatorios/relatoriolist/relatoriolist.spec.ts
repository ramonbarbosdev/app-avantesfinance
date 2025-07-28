import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Relatoriolist } from './relatoriolist';

describe('Relatoriolist', () => {
  let component: Relatoriolist;
  let fixture: ComponentFixture<Relatoriolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Relatoriolist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Relatoriolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
