import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { Transacao } from '../../models/transacao';
import { TransacaoContaService } from '../../services/transacao-conta.service';
import { AuthService } from '../../auth/auth.service';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2, lucideCheck, lucideSquarePen } from '@ng-icons/lucide';
import { Lancamento } from '../../models/lancamento';
import { ItemLancamento } from '../../models/item-lancamento';
import { Router } from '@angular/router';
import { formatarDataParaInput } from '../../utils/formatarDataParaInput';
import { Lancamentodetalheform } from '../../pages/lancamento/lancamentodetalheform/lancamentodetalheform';
import { LancamentoService } from '../../services/lancamento.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-table-transacao-conta',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmTableImports,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],
  templateUrl: './table-transacao-conta.html',
  styleUrl: './table-transacao-conta.scss',
})
export class TableTransacaoConta implements OnInit {
  public lista: Transacao[] = [];
  service = inject(TransacaoContaService);
  authService = inject(AuthService);
  router = inject(Router);
  lancamentoService = inject(LancamentoService);



  ngOnInit(): void {
    this.obterTransacao();
  }

  obterTransacao() {
    let apiKey = this.authService.getUser().pluggy.apiKey;
    let id_account = '91b3c6db-31ef-404b-9208-72e3e091a56a';

    this.service.findTransacao(id_account, apiKey).subscribe({
      next: (res) => {
        this.lista = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Transacao();
          item.accountId = index.accountId;
          item.amount = index.amount;
          item.category = index.category;
          item.type = index.type;
          item.operationType = index.operationType;
          item.description = this.formatarDescricao(index.description).tipo;
          item.recipien = this.formatarDescricao(
            index.description
          ).destinatario;
          item.date = index.date;
          this.lista = [...this.lista, item];
        });
      },
    });
  }

  formatarDescricao(descricao: string) {
    const partes = descricao.split('|');
    return {
      tipo: partes[0],
      destinatario: partes.length > 1 ? partes[1] : '',
    };
  }

 async  registrar(item: any) {
    let objeto = new Lancamento();
    let itens = new ItemLancamento();

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');

    let anomes = `${ano}${mes}`;
    let centrocusto = 1;

    let lancamento = new Lancamento();  
    
     lancamento = await this.obterLancamentoExistente(centrocusto, anomes);

    if (lancamento) {
      objeto = lancamento;
      objeto.dt_lancamento = formatarDataParaInput(lancamento.dt_lancamento);

       let ultimaPosicao = lancamento.itens[lancamento.itens.length  - 1];
       let novasequencia = Number(ultimaPosicao.cd_itemlancamento) + 1;

      itens.cd_itemlancamento =
      lancamento != null ? String(novasequencia) : '001';
      itens.id_categoria = item.type == 'CREDIT' ? 1 : 2;
      itens.vl_itemlancamento = item.amount;

      objeto.itens.push(itens);

    } else {
      objeto.cd_lancamento = '001';
      objeto.ds_lancamento = item.description;
      objeto.dt_lancamento = formatarDataParaInput(item.date);
      objeto.id_centrocusto = 1;
      objeto.dt_anomes = anomes;
      objeto.id_centrocusto = centrocusto;

      itens.cd_itemlancamento = '001';
      itens.id_categoria = item.type == 'CREDIT' ? 1 : 2;
      itens.vl_itemlancamento = item.amount;

      objeto.itens = [itens];
    }

    this.router.navigate(['/admin/lancamentoform'], {
      queryParams: {
        data: JSON.stringify({ objeto }),
      },
    });
  }

  async obterLancamentoExistente(
    id_centrocusto: number,
    dt_anomes: string
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.lancamentoService.findByCentroCustoByMes(id_centrocusto, dt_anomes)
      );
    } catch (error) {
      console.error('Erro ao obter lançamento:', error);
      return null;
    }
  }

  // obterLancamentoExistente(id_centrocusto: number, dt_anomes: string) {
  //   this.lancamentoService
  //     .findByCentroCustoByMes(id_centrocusto, dt_anomes)
  //     .subscribe({
  //       next: (res) => {
  //         this.lancamento = res;
  //       },
  //     });
  // }
}
