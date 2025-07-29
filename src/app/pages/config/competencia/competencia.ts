import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { BaseService } from '../../../services/base.service';
import { Competencias } from '../../../models/competencias';
import { formatAnoMes } from '../../../utils/formatAnoMes';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLockOpen, lucideLock } from '@ng-icons/lucide';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competencia',
  imports: [CommonModule, HlmTableImports, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideLockOpen, lucideLock })],
  templateUrl: './competencia.html',
  styleUrl: './competencia.scss',
})
export class Competencia implements OnInit {
  public objeto: Competencias[] = [];
  private baseService = inject(BaseService);
  router = inject(Router);

  ngOnInit(): void {
    this.obterCompetencias();
  }

  obterCompetencias() {
    this.baseService.findAll('competencia/').subscribe({
      next: (res) => {
        const novaListagem: Competencias[] = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Competencias();
          item.id_competencia = index.id_competencia;
          item.cd_competencia = formatAnoMes(index.cd_competencia);
          item.dt_fim = index.dt_fim;
          item.dt_inicio = index.dt_inicio;
          item.tp_status = index.tp_status;
          item.dt_ano = index.cd_competencia.substring(0, 4);
          novaListagem.push(item);
        });
        this.objeto = novaListagem;
      },
    });
  }

  mudarStatus(item: any) {
    this.baseService
      .findById('competencia/alterar-status', item.id_competencia)
      .subscribe({
        next: (res) => {
          this.obterCompetencias();
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
