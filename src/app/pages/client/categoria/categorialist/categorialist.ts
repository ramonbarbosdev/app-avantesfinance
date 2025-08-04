import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/helm/tabs';
import { Categorias } from '../../../../models/categorias';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { Categoriaform } from "../categoriaform/categoriaform";

@Component({
  selector: 'app-categorialist',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    Categoriaform
],
  providers: [
    provideIcons({
      lucideTrash2,
      lucideCheck,
      lucideSquarePen,
    }),
  ],
  templateUrl: './categorialist.html',
  styleUrl: './categorialist.scss',
})
export class Categorialist {
  public listagem: Categorias[] = [];
  endpoint = 'categoria';
  primaryKey = 'id_categoria';
  public baseService = inject(BaseService);
  router = inject(Router);

  ngOnInit(): void {
    this.onShow();
  }

  editar(item: any) {
    if (item && item[this.primaryKey]) {
      this.router.navigate([
        `client/${this.endpoint}form`,
        item[this.primaryKey],
      ]);
    } else {
      console.error('ID  está indefinido');
    }
  }

  onShow() {
    this.baseService.findAll(`${this.endpoint}/`).subscribe({
      next: (res) => {
        const novaListagem: Categorias[] = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Categorias();
          item.cd_categoria = index.cd_categoria;
          item.nm_categoria = index.nm_categoria;
          item.id_cliente = index.id_cliente;
          item.id_categoria = index.id_categoria;
          item.tp_categoria = index.tp_categoria;
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
