import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideLock, lucideLockOpen, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/helm/tabs';
import { Competencias } from '../../../../models/competencias';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { formatAnoMes } from '../../../../utils/formatAnoMes';
import { Competenciaform } from "../competenciaform/competenciaform";

@Component({
  selector: 'app-competencialist',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    Competenciaform
],
  providers: [
    provideIcons({
      lucideTrash2,
      lucideCheck,
      lucideSquarePen,
      lucideLockOpen,
      lucideLock,
    }),
  ],

  templateUrl: './competencialist.html',
  styleUrl: './competencialist.scss',
})
export class Competencialist {
  public listagem: Competencias[] = [];
  endpoint = 'competencia';
  primaryKey = 'id_competencia';
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
      console.error('ID  está indefinido');
    }
  }

  onShow() {
    this.baseService.findAll(`${this.endpoint}/`).subscribe({
      next: (res) => {
        const novaListagem: Competencias[] = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Competencias();
          item.id_competencia = index.id_competencia;
          item.cd_competencia = formatAnoMes(index.cd_competencia);
          item.tp_status = index.tp_status;
          item.dt_ano = index.cd_competencia.substring(0, 4);
          item.dt_fim = index.dt_fim;
          item.dt_inicio = index.dt_inicio;
          novaListagem.push(item);
        });
        this.listagem = novaListagem;
      },
    });
  }

  excluir(id: any) {
    this.baseService.deleteById(`${this.endpoint}`, id).subscribe({
      next: (res) => {
        this.onShow();
      },
    });
  }

  mudarStatus(item: any) {
    this.baseService
      .findById('competencia/alterar-status', item.id_competencia)
      .subscribe({
        next: (res) => {
          this.onShow();
          toast(res.message, {
            description: '',
            action: {
              label: 'Ok',
              onClick: () => {},
            },
          });
        },
      });
  }
}
