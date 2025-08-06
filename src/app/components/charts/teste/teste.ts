import { Component, inject, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { LayoutChartComponent } from '../layout-chart-component/layout-chart-component';
import { ThemeService } from '../../../services/theme.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
};
@Component({
  selector: 'app-teste',
  imports: [NgApexchartsModule, LayoutChartComponent],
  templateUrl: './teste.html',
  styleUrl: './teste.scss',
})
export class Teste {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;

  public themeService = inject(ThemeService);

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'My First Angular Chart',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
      theme: {
        mode: this.themeService.isDarkMode() ? "dark" : "light",
        // monochrome: {
        //   enabled: false,
        //   color: 'black',
        //   shadeTo: 'dark',
        //   shadeIntensity: 1,
        // },
      },
    };
  }
}
