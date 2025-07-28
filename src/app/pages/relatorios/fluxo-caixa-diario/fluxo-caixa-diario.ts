import { Component, inject, Input, OnInit } from '@angular/core';
import { RelatorioService } from '../../../services/relatorio.service';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';
import { CommonModule } from '@angular/common';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';

export class FluxoCaixaDiarioModel {
  public id_lancamento!: number;
  public dt_movimento!: string;
  public receita!: number;
  public despesa!: number;
  public saldo!: number;
}

@Component({
  selector: 'app-fluxo-caixa-diario',
  imports: [CommonModule, HlmTableImports, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideExternalLink })],
  templateUrl: './fluxo-caixa-diario.html',
  styleUrl: './fluxo-caixa-diario.scss',
})
export class FluxoCaixaDiario implements  OnInit {
  public objeto: FluxoCaixaDiarioModel[] = [];
  service = inject(RelatorioService);
  public id_lancamento!: number;

  @Input() item: any

  ngOnInit(): void {
    this.id_lancamento = this.item.id_lancamento;
    this.obterDados();
  }

  obterDados() {
    this.service
      .findRelatorioById('fluxo-caixa-diario', this.id_lancamento)
      .subscribe({
        next: (res) => {
          this.objeto = res.map((index: any) => {
            const item = new FluxoCaixaDiarioModel();
            item.id_lancamento = index.id_movimentacao;
            item.dt_movimento = formatarDataParaInput(index.dt_movimento);
            item.receita = index.receita;
            item.despesa = index.despesa;
            item.saldo = index.saldo;
            return item;
          });
        },
      });
  }
}
