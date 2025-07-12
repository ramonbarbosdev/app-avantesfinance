import { Component, inject, OnInit } from '@angular/core';

import { HlmTableImports } from '@spartan-ng/helm/table';
import { Items } from '../../models/items';
import { ItemsService } from '../../services/items.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conta',
  imports: [HlmTableImports, CommonModule],
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
    let id_item = '7d134838-5301-4ab7-90b2-8409c1325152';
    let apiKey = this.authService.getUser().pluggy.apiKey;

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

        console.log(this.listaItems);

        // const item = new Items();
        // item.id_item = res.id;
        // item.institutionUrl = res.connector.institutionUrl;
        // item.name = res.connector.name;
        // item.status = res.connector.health.status;
        // item.type = res.connector.type;
        // this.listaItems = [item]; 

      },
      error(e) {},
    });
  }

  protected _invoices = [];
}
