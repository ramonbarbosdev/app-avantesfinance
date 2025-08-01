import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCardContentDirective, HlmCardFooterDirective } from '@spartan-ng/helm/card';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from '../../../../models/clientes';
import { ZodError } from 'zod';
import { ClienteSchema } from '../../../../schema/clientes-schema';

@Component({
  selector: 'app-clienteform',
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
  templateUrl: './clienteform.html',
  styleUrl: './clienteform.scss',
})
export class Clienteform {
  baseService = inject(BaseService);
  endpoint = 'cliente';
  public objeto: Clientes = new Clientes();
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
        this.objeto.id_cliente = res.id_cliente;
        this.objeto.nm_cliente = res.nm_cliente;
        this.objeto.nu_cnpjcpf = res.nu_cnpjcpf;
        this.objeto.tp_status = res.tp_status;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  salvar() {
    if (this.validarItens()) {
      this.baseService
        .create(`${this.endpoint}/`, this.objeto)
        .subscribe({
          next: (res) => {
            if (this.fl_edicao) this.router.navigate(['admin/cliente']);
            if (!this.fl_edicao) window.location.reload();
          },
        });
    }
  }

  validarItens(): any {
      try {
        ClienteSchema.parse([this.objeto]);
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
        this.objeto = new Clientes();
        this.onShow();
      }
  
}
