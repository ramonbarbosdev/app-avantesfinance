import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { Combobox } from '../../../components/combobox/combobox';
import { MoneyCustom } from '../../../components/money-custom/money-custom';
import { DateCustom } from '../../../components/date-custom/date-custom';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { HlmCardContentDirective, HlmCardFooterDirective } from '@spartan-ng/helm/card';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Box } from '../../../models/box';
import { BaseService } from '../../../services/base.service';
import { Emprestimo } from '../../../models/emprestimo';
import { ItemEmprestimo } from '../../../models/item-emprestimo';
import { ActivatedRoute, Router } from '@angular/router';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';
import { LancametosSchema } from '../../../schema/lancamento-schema.';
import { ZodError } from 'zod';
import { EmprestimoSchema } from '../../../schema/emprestimo-schema';
import { Emprestimodetalheform } from '../emprestimodetalheform/emprestimodetalheform';

@Component({
  selector: 'app-emprestimoform',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    InputCustom,
    DateCustom,
    MoneyCustom,
    Combobox,
    HlmFormFieldModule,
    Emprestimodetalheform
  ],
  templateUrl: './emprestimoform.html',
  styleUrl: './emprestimoform.scss',
})
export class Emprestimoform implements OnInit {
  public listaCentroCusto: Box[] = [];
  public listaTipoEmprestimo: Box[] = [];
  public listaStatusEmprestimo: Box[] = [];
  baseService = inject(BaseService);
  public objeto: Emprestimo = new Emprestimo();
  public objetoItem: ItemEmprestimo = new ItemEmprestimo();
  public errorValidacao: Record<string, string> = {};
  fl_edicao = false;
  private route = inject(ActivatedRoute);
  endpoint = 'emprestimo';
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

   ngOnInit() {
     this.onShow();
  }

   onShow() {
    const key = this.route.snapshot.paramMap.get('id');
     this.obterCentroCusto();
     this.obterTipoEmprestimo();
     this.obterStatusEmprestimo();

    if (!key) {
      this.objeto.vl_total = 0;
      this.obterSequencia();
    } else {
      this.onEdit(key);
    }
  }

  onEdit(id: any) {
    if (!id) return;
    this.fl_edicao = true;

    this.baseService.findById(this.endpoint, id).subscribe({
      next: (res: any) => {
        res.dt_emprestimo = formatarDataParaInput(res.dt_emprestimo);
        res.cd_emprestimo = String(res.cd_emprestimo).padStart(3, '0');
        this.objeto = res;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  obterSequencia() {
    this.baseService.findSequence(this.endpoint).subscribe({
      next: (res) => {
        this.objeto.cd_emprestimo = res.sequencia;
      },
    });
  }

  salvar() {
    console.log(this.objeto);
    if (this.validarItens()) {
      this.baseService
        .createMestreDetalhe(this.endpoint, this.objeto)
        .subscribe({
          next: (res) => {
            if (this.fl_edicao) this.router.navigate(['client/emprestimo']);
            if (!this.fl_edicao) window.location.reload();
          },
        });
    }
  }

  validarItens(): any {
    try {
      EmprestimoSchema.parse([this.objeto]);
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

   obterCentroCusto(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.baseService.findAll('centrocusto/').subscribe({
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

   obterTipoEmprestimo(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.baseService.findAll(`${this.endpoint}/tipo-emprestimo`).subscribe({
        next: (res) => {
          this.listaTipoEmprestimo = (res as any).map((index: any) => {
            const item = new Box();
            item.value = index;
            item.label = index;
            return item;
          });
        },
        error: (err) => reject(err),
      });
    });
  }
   obterStatusEmprestimo(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.baseService.findAll(`${this.endpoint}/status-emprestimo`).subscribe({
        next: (res) => {
          this.listaStatusEmprestimo = (res as any).map((index: any) => {
            const item = new Box();
            item.value = index;
            item.label = index;
            return item;
          });
        },
        error: (err) => reject(err),
      });
    });
  }
}
