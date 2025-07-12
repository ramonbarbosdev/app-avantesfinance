import { Component, inject, OnInit } from '@angular/core';

import { HlmTableImports } from '@spartan-ng/helm/table';
import { Items } from '../../models/items';
import { ItemsService } from '../../services/items.service';
// import { HlmToasterComponent } from '@spartan-ng/helm/sonner';

@Component({
  selector: 'app-conta',
  imports: [HlmTableImports,],
  templateUrl: './conta.html',
  styleUrl: './conta.scss',
})
export class Conta implements OnInit {
  public items = new Items();
  private itemService = inject(ItemsService);

  ngOnInit(): void {
    this.obterItem();
  }

  obterItem() {
    let id_item!: string;
    let apiKey!: string;

    this.itemService.findItems(id_item, apiKey).subscribe({
      next: (res) => {
        console.log(res);

      },
      error(e) {
       

      },
    });
  }


  protected _invoices = [];
}
