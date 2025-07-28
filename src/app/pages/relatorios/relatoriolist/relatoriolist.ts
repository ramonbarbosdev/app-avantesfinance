import { Component } from '@angular/core';
import { FluxoCaixaMensal } from "../fluxo-caixa-mensal/fluxo-caixa-mensal";
import { SituacaoEmprestimo } from "../situacao-emprestimo/situacao-emprestimo";

@Component({
  selector: 'app-relatoriolist',
  imports: [FluxoCaixaMensal, SituacaoEmprestimo],
  templateUrl: './relatoriolist.html',
  styleUrl: './relatoriolist.scss'
})
export class Relatoriolist {

}
