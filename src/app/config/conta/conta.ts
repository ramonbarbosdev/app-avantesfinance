import { Component, inject, OnInit } from '@angular/core';

import { HlmTableImports } from '@spartan-ng/helm/table';
import { Items } from '../../models/items';
import { ItemsService } from '../../services/items.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';

@Component({
  selector: 'app-conta',
  imports: [HlmTableImports, CommonModule, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideTrash2 })],
  templateUrl: './conta.html',
  styleUrl: './conta.scss',
})
export class Conta implements OnInit {
  public listaItems: Items[] = [];
  private itemService = inject(ItemsService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.obterItem();
  }

  obterItem() {

    this.itemService.findItems().subscribe({
      next: (res) => {
        Object.values(res as any).forEach((index: any) => {
          const item = new Items();
          item.id_item = index.id_item;
          item.institutionUrl = index.institutionUrl;
          item.name = index.name;
          item.type = index.type;
          this.listaItems = [item];
        });
      },
      error(e) {},
    });
  }

  excluirItem(id_item: string )
  {
    let apiKey = this.authService.getUser().pluggy.apiKey;

    if (id_item)
      this.itemService.deleteItem(id_item, apiKey).subscribe({
        next: (res) => {
          this.obterItem();
        },
        error(e) {},
      });
  }
}
