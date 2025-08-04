import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardContentDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/helm/card';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { BaseService } from '../../../../services/base.service';
import { Categorias } from '../../../../models/categorias';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { ZodError } from 'zod';
import { CategoriaSchema } from '../../../../schema/categoria-schema';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { Combobox } from '../../../../components/combobox/combobox';
import { Box } from '../../../../models/box';

@Component({
  selector: 'app-categoriaform',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmFormFieldModule,
    InputCustom,
    Combobox,
  ],
  templateUrl: './categoriaform.html',
  styleUrl: './categoriaform.scss',
})
export class Categoriaform {
  baseService = inject(BaseService);
  endpoint = 'categoria';
  public objeto: Categorias = new Categorias();
  public errorValidacao: Record<string, string> = {};
  fl_edicao = false;
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  public listaTipo: Box[] = [];

  ngOnInit() {
    this.onShow();
  }
  onShow() {
    const key = this.route.snapshot.paramMap.get('id');
    this.obterTipo();
    if (!key) {
      this.obterSequencia();
    } else {
      this.onEdit(key);
    }
  }

  onEdit(id: any) {
    if (!id) return;
    this.fl_edicao = true;

    this.baseService.findById(`${this.endpoint}`, id).subscribe({
      next: (res: any) => {
        this.objeto.id_categoria = res.id_categoria;
        this.objeto.cd_categoria = res.cd_categoria;
        this.objeto.nm_categoria = res.nm_categoria;
        this.objeto.tp_categoria = res.tp_categoria;
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
          if (this.fl_edicao) this.router.navigate(['client/categoria']);
          if (!this.fl_edicao) window.location.reload();
        },
      });
    }
  }

  validarItens(): any {
    try {
      CategoriaSchema.parse([this.objeto]);
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
    this.objeto = new Categorias();
    this.onShow();
  }

  obterSequencia() {
    this.baseService.findSequence(this.endpoint).subscribe({
      next: (res) => {
        this.objeto.cd_categoria = res.sequencia;
      },
    });
  }

  obterTipo(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.baseService.findAll(`${this.endpoint}/tipo-categoria`).subscribe({
        next: (res) => {
          this.listaTipo = (res as any).map((index: any) => {
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
