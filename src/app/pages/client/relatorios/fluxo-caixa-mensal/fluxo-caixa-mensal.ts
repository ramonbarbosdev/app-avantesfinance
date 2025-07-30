import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink, lucideArrowLeft } from '@ng-icons/lucide';
import { FluxoCaixaDiario } from '../fluxo-caixa-diario/fluxo-caixa-diario';
import { RelatorioService } from '../../../../services/relatorio.service';
import { formatAnoMes } from '../../../../utils/formatAnoMes';

export class FluxoCaixaMensalModel {
  public id_lancamento!: number;
  public mesAno!: string;
  public id_centrocusto!: number;
  public nm_centrocusto!: string;
  public receita!: number;
  public despesa!: number;
  public saldo!: number;
}

@Component({
  selector: 'app-fluxo-caixa-mensal',
  imports: [
    CommonModule,
    HlmTableImports,
    HlmIconDirective,
    NgIcon,
    FluxoCaixaDiario,
  ],
  providers: [provideIcons({ lucideExternalLink, lucideArrowLeft })],
  templateUrl: './fluxo-caixa-mensal.html',
  styleUrl: './fluxo-caixa-mensal.scss',
})
export class FluxoCaixaMensal implements OnInit {
  public objeto: FluxoCaixaMensalModel[] = [];

  public fl_detalhar = false;
  public itemSelecionado!: number

  service = inject(RelatorioService);

  ngOnInit(): void {
    this.obterDados();
  }

  obterDados() {
    this.service.findAllRelatorio('fluxo-caixa-mensal').subscribe({
      next: (res) => {
        this.objeto = res.map((index: any) => {
          const item = new FluxoCaixaMensalModel();
          item.id_lancamento = index.id_lancamento;
          item.mesAno = formatAnoMes(index.mesAno);
          item.nm_centrocusto = index.nm_centrocusto;
          item.receita = index.receita;
          item.despesa = index.despesa;
          item.saldo = index.saldo;
          return item;
        });
      },
    });
  }

  detalharRegistro(item?: any) {
    if (item) {
      this.itemSelecionado = item; // ou setar ID, ou o que precisar
      this.fl_detalhar = true;
    } else {
      this.fl_detalhar = false;
    }
  }
}
