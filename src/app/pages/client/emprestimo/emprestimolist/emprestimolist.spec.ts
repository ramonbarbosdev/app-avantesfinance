import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emprestimolist } from './emprestimolist';

describe('Emprestimolist', () => {
  let component: Emprestimolist;
  let fixture: ComponentFixture<Emprestimolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emprestimolist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emprestimolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
