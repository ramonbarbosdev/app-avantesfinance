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

@Component({
  selector: 'app-table-transacao-conta',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
  ],
  templateUrl: './table-transacao-conta.html',
  styleUrl: './table-transacao-conta.scss',
})
export class TableTransacaoConta implements OnInit {
  public lista: Transacao[] = [];

  service = inject(TransacaoContaService);
  authService = inject(AuthService);

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
          item.recipien = this.formatarDescricao(index.description).destinatario;
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

  formataData(descricao: string) {}
}
