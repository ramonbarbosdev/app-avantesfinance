import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TableMovimentacao } from "../../../components/table-movimentacao/table-movimentacao";

import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideIterationCw } from '@ng-icons/lucide';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    TableMovimentacao,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideIterationCw })],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  totalSaldo = 23500.75;
  totalEntradas = 14200.0;
  totalSaidas = 8500.25;

  transacoesRecentes = [
    { descricao: 'Salário', valor: 7000, tipo: 'entrada', data: '10/07/2025' },
    {
      descricao: 'Supermercado',
      valor: -350.6,
      tipo: 'saida',
      data: '09/07/2025',
    },
    {
      descricao: 'Transferência Recebida',
      valor: 3200,
      tipo: 'entrada',
      data: '08/07/2025',
    },
    {
      descricao: 'Cartão de Crédito',
      valor: -1280.33,
      tipo: 'saida',
      data: '07/07/2025',
    },
  ];
}
