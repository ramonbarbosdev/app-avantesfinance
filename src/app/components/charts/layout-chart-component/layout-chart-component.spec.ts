import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutChartComponent } from './layout-chart-component';

describe('LayoutChartComponent', () => {
  let component: LayoutChartComponent;
  let fixture: ComponentFixture<LayoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
