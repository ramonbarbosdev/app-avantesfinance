import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardContentDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/helm/card';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { BaseService } from '../../../../services/base.service';
import { Usuario } from '../../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ZodError } from 'zod';
import { Box } from '../../../../models/box';
import { Combobox } from '../../../../components/combobox/combobox';
import { UsuarioSchema } from '../../../../schema/usuario-schema';
import { VinculoCliente } from "../../vinculo-cliente/vinculo-cliente";
import { Usuariocliente } from '../../../../models/usuariocliente';

@Component({
  selector: 'app-usuarioform',
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
    VinculoCliente,
  ],
  templateUrl: './usuarioform.html',
  styleUrl: './usuarioform.scss',
})
export class Usuarioform {
  baseService = inject(BaseService);
  endpoint = 'usuario';
  public objeto: Usuario = new Usuario();
  public objetoItem: Usuariocliente = new Usuariocliente();

  public errorValidacao: Record<string, string> = {};
  fl_edicao = false;
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  public listaRoles: Box[] = [];
  public listaClientes: Box[] = [];

  ngOnInit() {
    this.onShow();
  }

  onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    this.obterRoles();

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
        this.objeto.id = res.userId;
        this.objeto.nome = res.userNome;
        this.objeto.role = res.roles[0];
        this.objeto.login = res.userLogin;
        this.objeto.senha = res.userSenha;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  salvar() {
    if (this.validarItens()) {
      this.objeto.roles = [{ nomeRole: this.objeto.role }];
      this.baseService.create(`${this.endpoint}/`, this.objeto).subscribe({
        next: (res) => {
          if (this.fl_edicao) this.router.navigate(['admin/usuario']);
          if (!this.fl_edicao) window.location.reload();
        },
      });
    }
  }

  validarItens(): any {
    try {
      UsuarioSchema.parse([this.objeto]);
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
    this.objeto = new Usuario();
    this.onShow();
  }

  obterRoles() {
    return new Promise((resolve, reject) => {
      this.baseService.findAll('role/').subscribe({
        next: (res) => {
          this.listaRoles = (res as any).map((index: any) => {
            const item = new Box();
            item.value = String(index.nomeRole);
            item.label = index.nomeRole;
            return item;
          });
        },
        error: (err) => reject(err),
      });
    });
  }
  obterCliente() {
    return new Promise((resolve, reject) => {
      this.baseService.findAll('role/').subscribe({
        next: (res) => {
          this.listaRoles = (res as any).map((index: any) => {
            const item = new Box();
            item.value = String(index.nomeRole);
            item.label = index.nomeRole;
            return item;
          });
        },
        error: (err) => reject(err),
      });
    });
  }
}
