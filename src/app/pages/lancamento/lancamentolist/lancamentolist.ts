import { Component, inject, OnInit } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { CommonModule } from '@angular/common';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2, lucideCheck, lucideSquarePen } from '@ng-icons/lucide';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/helm/tabs';
import { Lancamento } from '../../../models/lancamento';
import { Lancamentoform } from "../lancamentoform/lancamentoform";
import { LancamentoService } from '../../../services/lancamento.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lancamentolist',
  imports: [
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    Lancamentoform,
  ],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],
  templateUrl: './lancamentolist.html',
  styleUrl: './lancamentolist.scss',
})
export class Lancamentolist implements OnInit {
  public listagem: Lancamento[] = [];
  endpoint = 'lancamento';
  primaryKey = 'id_lancamento';
  public service = inject(LancamentoService);

  router = inject(Router);

  ngOnInit(): void {
    this.onShow();
  }

  editar(item: any) {
    if (item && item.id_lancamento) {
      this.router.navigate([`admin/${this.endpoint}form`, item[this.primaryKey]]);
    } else {
      console.error('ID do lançamento está indefinido');
    }
  }

  onShow() {
    this.service.findAll(`${this.endpoint}/`).subscribe({
      next: (res) => {
        this.listagem = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Lancamento();
          item.id_lancamento = index.id_lancamento;
          item.cd_lancamento = index.cd_lancamento;
          item.ds_lancamento = index.ds_lancamento;
          item.dt_anomes = index.dt_anomes;
          item.dt_lancamento = index.dt_lancamento;
          item.id_centrocusto = index.id_centrocusto;
          item.vl_total = index.vl_total;
          this.listagem = [...this.listagem, item];
        });
      },
    });
  }

  excluir(id: any) {}
}
