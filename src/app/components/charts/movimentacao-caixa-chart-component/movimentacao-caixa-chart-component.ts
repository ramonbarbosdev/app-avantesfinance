import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ThemeService } from '../../../services/theme.service';
import { LayoutChartComponent } from '../layout-chart-component/layout-chart-component';
import { BaseService } from '../../../services/base.service';
import { RelatorioService } from '../../../services/relatorio.service';
import { CommonModule } from '@angular/common';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  theme: ApexTheme;
};

interface DadosApi {
  id_centrocusto: number;
  dt_mes: string;
  dt_ano: string;
  id_cliente: number;
  vl_receita: number;
  vl_despesa: number;
}

@Component({
  selector: 'app-movimentacao-caixa-chart-component',
  imports: [NgApexchartsModule, LayoutChartComponent, CommonModule],
  templateUrl: './movimentacao-caixa-chart-component.html',
  styleUrl: './movimentacao-caixa-chart-component.scss',
})
export class MovimentacaoCaixaChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;
  public themeService = inject(ThemeService);
  public service = inject(RelatorioService);

  dadosApi: DadosApi[] = [];

  constructor() {}
  ngOnInit(): void {
    this.obterDados();
  }

  buid(categories:any, value1:any, value2:any) {
    this.chartOptions = {
      series: [
        { name: 'Receita', data: value1 },
        { name: 'Despesa', data: value2 },
      ],
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: categories,
      },
      theme: {
        mode: this.themeService.isDarkMode() ? 'dark' : 'light',
      },
    };
  }

  obterDados() {
    this.service.findAllRelatorio('evolucao-receita-despesa').subscribe({
      next: (res) => {
        const grouped: Record<string, { receita: number; despesa: number }> =
          {};

        res.forEach((item: any) => {
          const data = new Date(item.dt_movimento);
          let key = String(data.getUTCDate()).padStart(2, '0');
          if (!grouped[key]) grouped[key] = { receita: 0, despesa: 0 };

          grouped[key].receita += item.vl_receita;
          grouped[key].despesa += item.vl_despesa;
        });

        const categories = Object.keys(grouped).sort();
        const receitaData = categories.map((key) => grouped[key].receita);
        const despesaData = categories.map((key) => grouped[key].despesa);
        this.buid(categories, receitaData,despesaData);
        
      },
    });
  }
}
