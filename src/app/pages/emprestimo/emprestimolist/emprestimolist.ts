import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/helm/tabs';
import { Emprestimo } from '../../../models/emprestimo';
import { Router } from '@angular/router';
import { EmprestimoService } from '../../../services/emprestimo.service';
import { BaseService } from '../../../services/base.service';
import { Emprestimoform } from "../emprestimoform/emprestimoform";
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';

@Component({
  selector: 'app-emprestimolist',
  imports: [
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    Emprestimoform
],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],
  templateUrl: './emprestimolist.html',
  styleUrl: './emprestimolist.scss',
})
export class Emprestimolist implements OnInit {
  public listagem: Emprestimo[] = [];
  endpoint = 'emprestimo';
  primaryKey = 'id_emprestimo';
  public service = inject(EmprestimoService);
  public baseService = inject(BaseService);

  router = inject(Router);

  ngOnInit(): void {
    this.onShow();
  }

  editar(item: any) {
    if (item && item[this.primaryKey]) {
      this.router.navigate([
        `client/${this.endpoint}form`,
        item[this.primaryKey],
      ]);
    } else {
      console.error('ID do lançamento está indefinido');
    }
  }

  onShow() {
    this.baseService.findAll(`${this.endpoint}/`).subscribe({
      next: (res) => {
        const novaListagem: Emprestimo[] = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Emprestimo();
          item.id_emprestimo = index.id_emprestimo;
          item.cd_emprestimo = index.cd_emprestimo;
          item.ds_observacao = index.ds_observacao;
          item.dt_emprestimo = formatarDataParaInput(index.dt_emprestimo)
          item.id_centrocusto = index.centroCusto.nm_centrocusto;
          item.tp_emprestimo = index.tp_emprestimo;
          item.tp_status = index.tp_status;
          item.vl_total = index.vl_total;
          novaListagem.push(item);
        });
        this.listagem = novaListagem;
        //  this.cdr.markForCheck();
      },
    });
  }

  excluir(id: any) {
    this.baseService.deleteById(`${this.endpoint}/deletar`, id).subscribe({
      next: (res) => {
        this.onShow();
      },
    });
  }
}
