import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { MovimentacaoLancamento } from '../../models/movimentacao-lancamento';
import { formatarDataParaInput } from '../../utils/formatarDataParaInput';
import { formatAnoMes } from '../../utils/formatAnoMes';

@Component({
  selector: 'app-table-movimentacao',
  imports: [HlmTableImports, CommonModule],
  templateUrl: './table-movimentacao.html',
  styleUrl: './table-movimentacao.scss',
})
export class TableMovimentacao  implements OnInit{

  public objeto: MovimentacaoLancamento[] = [];

  service = inject(MovimentacaoService);

    ngOnInit(): void {
      this.obterMovimentacaoGeral();
  }

  obterMovimentacaoGeral() {
    this.service.findAll().subscribe({
      next: (res) => {
        console.log(res)
        this.objeto = res.map((index: any) => {
          const item = new MovimentacaoLancamento();
          item.id_movimentacao = index.id_movimentacao;
          item.dt_anomes = formatAnoMes(index.dt_anomes);
          item.dt_movimento = formatarDataParaInput(index.dt_movimento);
          item.id_centrocusto = index.centroCusto.nm_centrocusto;
          item.id_lancamento = index.id_lancamento;
          item.vl_despesa = index.vl_despesa;
          item.vl_receita = index.vl_receita;
          item.vl_saldo = index.vl_saldo;

          return item;
        });
      },
    });
  }
}
