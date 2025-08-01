import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { HlmSpinnerComponent } from '@spartan-ng/helm/spinner';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseService } from '../../../services/base.service';
import { Box } from '../../../models/box';
import { Combobox } from '../../../components/combobox/combobox';
import { toast } from 'ngx-sonner';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-login',
  imports: [
    HlmButtonDirective,
    InputCustom,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Combobox,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public objeto = { login: '', senha: '', id_cliente: null, role: '' };
  public listaClientes: Box[] = [];
  public listaRoles: Box[] = [];
  router = inject(Router);
  constructor(private auth: AuthService) {}
  public fl_exibirCliente = false;
  public fl_exibirADM = false;
  private clienteService = inject(ClienteService);

  logar() {
    if (!this.objeto.login) {
      return;
    }

    this.auth.login(this.objeto).subscribe({
      next: (res: any) => {
        this.gerenciarRotaUsuario(res);
      },
      error: (err) => {
        this.tratarErro(err);
      },
    });
  }

  processarLogin() {
    const login = this.objeto.login?.trim();
    this.fl_exibirCliente = false;
    this.fl_exibirADM = false;
    this.listaRoles = [];
    this.listaClientes = [];

    if (!login) {
      return;
    }

    this.auth.findByLogin(login).subscribe({
      next: (res: any[]) => {
        this.fl_exibirCliente = true;
        this.listaClientes = res
          .filter((item: any) => item.tp_status === 'ATIVO' && item.cliente)
          .map((item: any) => ({
            value: String(item.cliente.id_cliente),
            label: item.cliente.nm_cliente,
          }));

        let userRole = res[0].usuario.roles[0];
        if (userRole.nomeRole === 'ROLE_ADMIN') {
          this.fl_exibirADM = true;
          this.listaRoles = [
            { label: 'Administrador', value: 'admin' },
            { label: 'Cliente', value: 'client' },
          ];
        } else {
          this.objeto.role = 'client';
        }
      },
      error: (error) => {
        this.fl_exibirCliente = false;
        this.fl_exibirADM = false;

        // this.listaClientes.length = 0;
      },
    });
  }

  gerenciarRotaUsuario(res: any) {
    if (!this.objeto.id_cliente || !this.objeto.role) {
      toast('Escopo(s) inválido(s) fornecido(s)', {
        description: '',
        action: {
          label: 'Ok',
          onClick: () => {},
        },
      });
      return;
    }
    res.id_cliente = this.objeto.id_cliente;
    res.role = this.objeto.role;
    this.clienteService.setObjeto(String(this.objeto.id_cliente));
    this.auth.setUser(res);
    this.auth.setToken(res.Authorization);
    //  this.router.navigate(['admin/dashboard']);

    if (this.objeto.role == 'admin')
      this.router.navigate([`${this.objeto.role}/dashboard`]);
    if (this.objeto.role == 'client')
      this.router.navigate([`${this.objeto.role}/home`]);
  }

  tratarErro(e: any) {
    const status = e.status ?? null;
    let mensagem = 'Login ou senha incorreto';

    if (status == 403) {
      mensagem = 'Escopo(s) inválido(s) fornecido(s)';
    } else if (status == 0) {
      mensagem = 'Sem comunicação com o servidor.';
    }

    Swal.fire({
      icon: 'error',
      title: 'Erro ao efeituar o Login',
      text: mensagem,
      confirmButtonText: 'OK',
    });
  }
}
