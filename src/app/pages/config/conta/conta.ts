import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { HlmTableImports } from '@spartan-ng/helm/table';
import { CommonModule } from '@angular/common';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2, lucideCheck } from '@ng-icons/lucide';

import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/helm/tabs';

import { ItemsService } from '../../../services/items.service';
import { AuthService } from '../../../auth/auth.service';
import { Items } from '../../../models/items';
import { Contaform } from "../contaform/contaform";
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  imports: [
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    Contaform,
  ],
  providers: [provideIcons({ lucideTrash2, lucideCheck })],
  templateUrl: './conta.html',
  styleUrl: './conta.scss',
})
export class Conta implements OnInit {
  public listaItems: Items[] = [];
  private itemService = inject(ItemsService);
  private authService = inject(AuthService);
  private eventService = inject(EventService);
  router = inject(Router);
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.obterItem();
    this.eventService.itemReload$.subscribe(() => {
      this.obterItem();
      this.cdRef.detectChanges();
    });
  }

  obterItem() {
    this.itemService.findItems().subscribe({
      next: (res) => {
        this.listaItems = [];
        Object.values(res as any).forEach((index: any) => {
          const item = new Items();
          item.id_item = index.id_item;
          item.institutionUrl = index.institutionUrl;
          item.name = index.name;
          item.type = index.type;
          item.fl_main = index.flMain;
          this.listaItems = [...this.listaItems, item];
        });
      },
      error(e) {},
    });
  }

  excluirItem(id_item: string) {
    let apiKey = this.authService.getUser().pluggy.apiKey;

    if (id_item)
      this.itemService.deleteItem(id_item, apiKey).subscribe({
        next: (res) => {
          this.obterItem();
        },
        error(e) {},
      });
  }

  tornarPrincipal(id_item: string) {

    if (id_item)
      this.itemService.isMain(id_item).subscribe({
        next: (res) => {
          this.obterItem();
        },
        error(e) {},
      });
  }
}
