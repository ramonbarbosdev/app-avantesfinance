import { Component } from '@angular/core';
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
import { Lancamento } from '../../../models/lancamento';
import { Lancamentoform } from "../lancamentoform/lancamentoform";
@Component({
  selector: 'app-lancamentolist',
  imports: [
    HlmTableImports,
    CommonModule,
    HlmIconDirective,
    NgIcon,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    Lancamentoform
],
  providers: [provideIcons({ lucideTrash2, lucideCheck })],
  templateUrl: './lancamentolist.html',
  styleUrl: './lancamentolist.scss',
})
export class Lancamentolist {
  public listagem: Lancamento[] = [];

  editar(id: any) {}

  excluir(id: any) {}
}
