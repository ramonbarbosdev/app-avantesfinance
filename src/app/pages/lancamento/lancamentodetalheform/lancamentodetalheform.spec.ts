import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lancamentodetalheform } from './lancamentodetalheform';

describe('Lancamentodetalheform', () => {
  let component: Lancamentodetalheform;
  let fixture: ComponentFixture<Lancamentodetalheform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lancamentodetalheform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lancamentodetalheform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
