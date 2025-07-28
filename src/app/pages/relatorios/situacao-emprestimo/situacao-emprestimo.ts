import { Component, inject, OnInit } from '@angular/core';
import { RelatorioService } from '../../../services/relatorio.service';
import { formatAnoMes } from '../../../utils/formatAnoMes';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { CommonModule } from '@angular/common';



export class SituacaoEmprestimoModel {
  public id_emprestimo!: number;
  public cd_emprestimo!: string;
  public tp_emprestimo!: string;
  public dt_emprestimo!: string;
  public tp_status!: string;
  public total_emprestado!: number;
  public total_pago!: number;
  public em_aberto!: number;
}


@Component({
  selector: 'app-situacao-emprestimo',
  imports: [
    CommonModule,
    HlmTableImports,
  ],
  templateUrl: './situacao-emprestimo.html',
  styleUrl: './situacao-emprestimo.scss',
})
export class SituacaoEmprestimo implements OnInit {
  public objeto: SituacaoEmprestimoModel[] = [];

  public fl_detalhar = false;
  public itemSelecionado!: number;

  service = inject(RelatorioService);

  ngOnInit(): void {
    this.obterDados();
  }

  obterDados() {
    this.service.findAllRelatorio('situacao-emprestimo').subscribe({
      next: (res) => {
        this.objeto = res.map((index: any) => {
          const item = new SituacaoEmprestimoModel();
          item.id_emprestimo = index.id_lancamento;
          item.cd_emprestimo = index.cd_emprestimo;
          item.tp_emprestimo = index.tp_emprestimo;
          item.dt_emprestimo = formatarDataParaInput(index.dt_emprestimo);
          item.tp_status = index.tp_status;
          item.total_emprestado = index.total_emprestado;
          item.total_pago = index.total_pago;
          item.em_aberto = index.em_aberto;
          return item;
        });
      },
    });
  }
}
