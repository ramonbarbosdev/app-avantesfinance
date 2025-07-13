import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCardContentDirective, HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/helm/card';
import { TableTransacaoConta } from '../../components/table-transacao-conta/table-transacao-conta';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    TableTransacaoConta
  ],
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
