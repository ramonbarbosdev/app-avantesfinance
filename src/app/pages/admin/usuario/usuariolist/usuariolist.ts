import { Component, inject } from '@angular/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/helm/tabs';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { Usuario } from '../../../../models/usuario';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { Usuarioform } from "../usuarioform/usuarioform";
@Component({
  selector: 'app-usuariolist',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    Usuarioform
],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],

  templateUrl: './usuariolist.html',
  styleUrl: './usuariolist.scss',
})
export class Usuariolist {
  public listagem: Usuario[] = [];
  endpoint = 'usuario';
  primaryKey = 'id';

  public baseService = inject(BaseService);

  router = inject(Router);

  ngOnInit(): void {
    this.onShow();
  }

  editar(item: any) {
    if (item && item[this.primaryKey]) {
      this.router.navigate([
        `admin/${this.endpoint}form`,
        item[this.primaryKey],
      ]);
    } else {
      console.error('ID  está indefinido');
    }
  }

  onShow() {
    this.baseService
      .findAll(`${this.endpoint}/`)
      .subscribe({
        next: (res) => {
          const novaListagem: Usuario[] = [];
          Object.values(res as any).forEach((index: any) => {
            const item = new Usuario();
            item.id = index.userId;
            item.nome = index.userNome;
            item.role = index.roles[0];
            item.login = index.userLogin;
            // item.id_cliente = index.cliente.nm_cliente;
            novaListagem.push(item);
          });
          this.listagem = novaListagem;
          //  this.cdr.markForCheck();
        },
      });
  }

  excluir(id: any) {
    this.baseService.deleteById(`${this.endpoint}`, id).subscribe({
      next: (res) => {
        this.onShow();
      },
    });
  }
}
