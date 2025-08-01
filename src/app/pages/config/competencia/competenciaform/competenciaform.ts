import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { Competencias } from '../../../../models/competencias';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteSchema } from '../../../../schema/clientes-schema';
import { ZodError } from 'zod';
import { CompetenciaSchema } from '../../../../schema/competencia-schema';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardContentDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/helm/card';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { formatAnoMes } from '../../../../utils/formatAnoMes';
import { DateCustom } from '../../../../components/date-custom/date-custom';

@Component({
  selector: 'app-competenciaform',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmFormFieldModule,
    InputCustom,
    DateCustom,
  ],
  templateUrl: './competenciaform.html',
  styleUrl: './competenciaform.scss',
})
export class Competenciaform {
  baseService = inject(BaseService);
  endpoint = 'competencia';
  public objeto: Competencias = new Competencias();
  public errorValidacao: Record<string, string> = {};
  fl_edicao = false;
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    if (!key) {
      this.objeto.tp_status = 'ABERTO';
    } else {
      this.onEdit(key);
    }
  }

  onEdit(id: any) {
    if (!id) return;
    this.fl_edicao = true;

    this.baseService.findById(`${this.endpoint}`, id).subscribe({
      next: (res: any) => {
        this.objeto.id_competencia = res.id_competencia;
        this.objeto.cd_competencia = res.cd_competencia;
        this.objeto.dt_competencia = res.dt_competencia;
        this.objeto.nm_competencia = formatAnoMes(this.objeto.cd_competencia);
        this.objeto.dt_ano = this.objeto.cd_competencia.substring(0, 4);
        this.objeto.tp_status = res.tp_status;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  salvar() {
    if (this.validarItens()) {
      console.log(this.objeto);
      this.baseService
        .create(`${this.endpoint}/`, this.objeto)
        .subscribe({
          next: (res) => {
            if (this.fl_edicao) this.router.navigate(['client/competencia']);
            if (!this.fl_edicao) window.location.reload();
          },
        });
    }
  }

  validarItens(): any {
    try {
      CompetenciaSchema.parse([this.objeto]);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        this.errorValidacao = {};
        error.issues.forEach((e) => {
          const value = e.path[1];
          this.errorValidacao[String(value)] = e.message;
        });

        return false;
      }
    }
  }

  limparFormulario() {
    this.objeto = new Competencias();
    this.onShow();
  }

  processarCompetencia(evento: any) {
    if (evento) {
      const data = new Date(evento);

      // Garantindo data formatada no padrão dd/MM/yyyy
      const dia = String(data.getUTCDate()).padStart(2, '0');
      const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
      const ano = data.getUTCFullYear();
      const dataFormatada = `${dia}/${mes}/${ano}`;

      // Monta o formato YYYYMM
      const formatoYYYYMM = `${ano}${mes}`;

      // Atribuição aos campos do objeto
      this.objeto.dt_competencia = dataFormatada;
      this.objeto.cd_competencia = formatoYYYYMM;
      this.objeto.nm_competencia = formatAnoMes(formatoYYYYMM);
      this.objeto.dt_ano = ano.toString();
    } else {
      this.objeto.nm_competencia = '';
      this.objeto.dt_ano = '';
    }
  }
}
