import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { Roles } from '../../../../models/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSchema } from '../../../../schema/usuario-schema';
import { ZodError } from 'zod';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCardContentDirective, HlmCardFooterDirective } from '@spartan-ng/helm/card';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { RoleSchema } from '../../../../schema/roles-schema';

@Component({
  selector: 'app-roleform',
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
  templateUrl: './roleform.html',
  styleUrl: './roleform.scss',
})
export class Roleform {
  baseService = inject(BaseService);
  endpoint = 'role';
  public objeto: Roles = new Roles();
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
    } else {
      this.onEdit(key);
    }
  }

  onEdit(id: any) {
    if (!id) return;
    this.fl_edicao = true;

    this.baseService.findById(`${this.endpoint}`, id).subscribe({
      next: (res: any) => {
        this.objeto.id = res.id;
        this.objeto.nomeRole = res.nomeRole;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  salvar() {
    if (this.validarItens()) {
      this.baseService
        .create(`${this.endpoint}/criar-role`, this.objeto)
        .subscribe({
          next: (res) => {
            if (this.fl_edicao) this.router.navigate(['admin/role']);
            if (!this.fl_edicao) window.location.reload();
          },
        });
    }
  }

  validarItens(): any {
    try {
      RoleSchema.parse([this.objeto]);
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
    this.objeto = new Roles();
    this.onShow();
  }
}
