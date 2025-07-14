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

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    HlmButtonDirective,
    InputCustom,
    HlmSpinnerComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public objeto = { login: '', senha: '' };

  public loading = false;

  router = inject(Router);
  constructor(private auth: AuthService) {}

  logar() {
    this.loading = true;

    if (!this.objeto.login) 
    {
        this.loading = false;
        return;
    }

    this.auth.login(this.objeto).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.auth.setUser(res);
        this.auth.setToken(res.Authorization);
        this.router.navigate(['admin/home']);
      },
      error: (err) => {
        this.loading = false;
        this.tratarErro(err);
      },
    });
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
