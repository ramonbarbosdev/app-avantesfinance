import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/helm/tabs';
import { Clientes } from '../../../../models/clientes';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { Clienteform } from "../clienteform/clienteform";

@Component({
  selector: 'app-clientelist',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    Clienteform
],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],

  templateUrl: './clientelist.html',
  styleUrl: './clientelist.scss',
})
export class Clientelist {
  public listagem: Clientes[] = [];
  endpoint = 'cliente';
  primaryKey = 'id_cliente';
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
      this.baseService.findAll(`${this.endpoint}/`).subscribe({
        next: (res) => {
          const novaListagem: Clientes[] = [];
          Object.values(res as any).forEach((index: any) => {
            const item = new Clientes();
            item.id_cliente = index.id_cliente;
            item.nm_cliente = index.nm_cliente;
            item.nu_cnpjcpf = index.nu_cnpjcpf;
            item.tp_status = index.tp_status;
            novaListagem.push(item);
          });
          this.listagem = novaListagem;
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
