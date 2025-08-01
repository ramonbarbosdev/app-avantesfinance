import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/helm/tabs';
import { Roles } from '../../../../models/roles';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { Roleform } from "../roleform/roleform";

@Component({
  selector: 'app-rolelist',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    Roleform
],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],
  templateUrl: './rolelist.html',
  styleUrl: './rolelist.scss',
})
export class Rolelist {
  public listagem: Roles[] = [];
  endpoint = 'role';
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
    this.baseService.findAll(`${this.endpoint}/`).subscribe({
      next: (res) => {
        const novaListagem: Roles[] = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Roles();
          item.id = index.id;
          item.nomeRole = index.nomeRole;
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
