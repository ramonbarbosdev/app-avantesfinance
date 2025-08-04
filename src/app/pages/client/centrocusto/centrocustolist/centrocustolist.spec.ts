import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Centrocustolist } from './centrocustolist';

describe('Centrocustolist', () => {
  let component: Centrocustolist;
  let fixture: ComponentFixture<Centrocustolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Centrocustolist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Centrocustolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
