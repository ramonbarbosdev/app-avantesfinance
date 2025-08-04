import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCardContentDirective, HlmCardFooterDirective } from '@spartan-ng/helm/card';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { BaseService } from '../../../../services/base.service';
import { Centrocustos } from '../../../../models/centrocustos';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { ZodError } from 'zod';
import { CentroCustoSchema } from '../../../../schema/centrocusto-schema';

@Component({
  selector: 'app-centrocustoform',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmFormFieldModule,
    InputCustom,
  ],
  templateUrl: './centrocustoform.html',
  styleUrl: './centrocustoform.scss',
})
export class Centrocustoform {
  baseService = inject(BaseService);
  endpoint = 'centrocusto';
  public objeto: Centrocustos = new Centrocustos();
  public errorValidacao: Record<string, string> = {};
  fl_edicao = false;
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  private auth = inject(AuthService);

  ngOnInit() {
    this.onShow();
  }
  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    if (!key) {
      this.obterSequencia()
    } else {
      this.onEdit(key);
    }
  }

  onEdit(id: any) {
    if (!id) return;
    this.fl_edicao = true;

    this.baseService.findById(`${this.endpoint}`, id).subscribe({
      next: (res: any) => {
        this.objeto.id_centrocusto = res.id_centrocusto;
        this.objeto.cd_centrocusto = res.cd_centrocusto;
        this.objeto.ds_centrocusto = res.ds_centrocusto;
        this.objeto.nm_centrocusto = res.nm_centrocusto;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  salvar() {
    if (this.validarItens()) {
      console.log(this.objeto);
      this.baseService.create(`${this.endpoint}/`, this.objeto).subscribe({
        next: (res) => {
          if (this.fl_edicao) this.router.navigate(['client/centrocusto']);
          if (!this.fl_edicao) window.location.reload();
        },
      });
    }
  }

  validarItens(): any {
    try {
      CentroCustoSchema.parse([this.objeto]);
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
    this.objeto = new Centrocustos();
    this.onShow();
  }

  obterSequencia() {
    this.baseService.findSequence('centrocusto').subscribe({
      next: (res) => {
        this.objeto.cd_centrocusto = res.sequencia;
      },
    });
  }
}
