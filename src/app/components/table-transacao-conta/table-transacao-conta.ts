import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { LancamentoService } from '../../services/lancamento.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/helm/dialog';
import { Box } from '../../models/box';
import { Combobox } from '../combobox/combobox';
import { LancametosSchema } from '../../schema/lancamento-schema.';
import { ZodError } from 'zod';
import { RegistrarItemSchema, RegistrarItensSchema } from '../../schema/registrarItem-schema';
@Component({
  selector: 'app-table-transacao-conta',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmTableImports,
    HlmIconDirective,
    NgIcon,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmButtonDirective,
    Combobox,
  ],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],
  templateUrl: './table-transacao-conta.html',
  styleUrl: './table-transacao-conta.scss',
})
export class TableTransacaoConta implements OnInit {
  public listaCentroCusto: Box[] = [];
  public lista: Transacao[] = [];
  service = inject(TransacaoContaService);
  authService = inject(AuthService);
  router = inject(Router);
  lancamentoService = inject(LancamentoService);
  private cdr = inject(ChangeDetectorRef);

  public id_centrocusto!: number;
  public errorValidacao: Record<string, string> = {};

  ngOnInit(): void {
    this.obterTransacao();
    this.obterCentroCusto();
  }

  // Exemplo de paginação simples
  paginaAtual = 1;
  itensPorPagina = 10;
  totalPaginas = 0;
  totalItens = 0;


  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.irParaPagina(this.paginaAtual + 1);
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.irParaPagina(this.paginaAtual - 1);
    }
  }

  irParaPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.obterTransacao();
    }
  }

  obterTransacao() {
    let apiKey = this.authService.getUser().pluggy.apiKey;
    let id_account = '91b3c6db-31ef-404b-9208-72e3e091a56a';

    this.service
      .findTransacao(id_account, apiKey, this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: (res) => {
          this.totalPaginas = res.totalPages;
          this.totalItens = res.total;
          console.log(res);

          this.lista = res.results.map((index: any) => {
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
            return item;
          });

           this.cdr.detectChanges();
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

  async registrar(item: any) {
    let objeto = new Lancamento();
    let itens = new ItemLancamento();

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');

    if (!this.validarItens()) return;

    let anomes = `${ano}${mes}`;
    let centrocusto = this.id_centrocusto;

    let lancamento = new Lancamento();

    lancamento = await this.obterLancamentoExistente(centrocusto, anomes);

    if (lancamento) {
      objeto = lancamento;
      objeto.dt_lancamento = formatarDataParaInput(objeto.dt_lancamento);

      let ultimaPosicao = lancamento.itens[lancamento.itens.length - 1];
      let novasequencia = Number(ultimaPosicao.cd_itemlancamento) + 1;

      itens.cd_itemlancamento =
        lancamento != null ? String(novasequencia) : '001';
      itens.id_categoria = item.type == 'CREDIT' ? 1 : 2;
      itens.vl_itemlancamento = item.amount;

      objeto.itens.push(itens);
    } else {
      let res = await this.obterSequencia();
      objeto.cd_lancamento = res.sequencia;
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

  validarItens(): any {
    try {
      RegistrarItensSchema.parse([{ id_centrocusto: this.id_centrocusto }]);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        this.errorValidacao = {};
        error.issues.forEach((e) => {
          const value = e.path[0];
          console.log(e);
          this.errorValidacao[String(value)] = e.message;
        });

        return false;
      }
    }
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

  async obterSequencia(): Promise<any> {
    try {
      return await firstValueFrom(this.lancamentoService.findSequence());
    } catch (error) {
      console.error('Erro ao obter lançamento:', error);
      return null;
    }
  }

  async obterCentroCusto(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.lancamentoService.findAll('centrocusto/').subscribe({
        next: (res) => {
          this.listaCentroCusto = (res as any).map((index: any) => {
            const item = new Box();
            item.value = String(index.id_centrocusto);
            item.label = index.nm_centrocusto;
            return item;
          });
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }
}
