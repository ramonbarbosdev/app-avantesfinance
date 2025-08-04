import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/helm/tabs';
import { Centrocustos } from '../../../../models/centrocustos';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { Centrocustoform } from "../centrocustoform/centrocustoform";

@Component({
  selector: 'app-centrocustolist',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    Centrocustoform
],
  providers: [
    provideIcons({
      lucideTrash2,
      lucideCheck,
      lucideSquarePen,
    }),
  ],
  templateUrl: './centrocustolist.html',
  styleUrl: './centrocustolist.scss',
})
export class Centrocustolist {
  public listagem: Centrocustos[] = [];
  endpoint = 'centrocusto';
  primaryKey = 'id_centrocusto';
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
        const novaListagem: Centrocustos[] = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Centrocustos();
          item.id_centrocusto = index.id_centrocusto;
          item.cd_centrocusto = index.cd_centrocusto;
          item.ds_centrocusto = index.ds_centrocusto;
          item.nm_centrocusto = index.nm_centrocusto;
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
