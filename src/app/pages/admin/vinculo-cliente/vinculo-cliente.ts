import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/brain/sheet';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/helm/sheet';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { Usuariocliente } from '../../../models/usuariocliente';
import { BaseService } from '../../../services/base.service';
import { Box } from '../../../models/box';
import { ItemEmprestimoSchema } from '../../../schema/itememprestimo-schema';
import { ZodError } from 'zod';
import { Combobox } from '../../../components/combobox/combobox';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSquarePen, lucideTrash2 } from '@ng-icons/lucide';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { InputCustom } from "../../../components/input-custom/input-custom";
import { VinculoClienteSchema } from '../../../schema/vinculocliente';

@Component({
  selector: 'app-vinculo-cliente',
  imports: [
    CommonModule,
    HlmButtonDirective,
    ReactiveFormsModule,
    FormsModule,
    HlmIconDirective,
    NgIcon,
    HlmTableImports,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetFooterComponent,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    Combobox,
    InputCustom,
  ],
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],

  templateUrl: './vinculo-cliente.html',
  styleUrl: './vinculo-cliente.scss',
})
export class VinculoCliente implements OnChanges, OnInit {
  @Input() objeto: any;
  @Output() objetoChange = new EventEmitter<any>();
  @Input() itemTemp: Usuariocliente = new Usuariocliente();
  @Input() nomeItem!: string;
  @Input() relacionado: any;
  indexEditando: number | null = null;
  public errorValidacao: Record<string, string> = {};
  baseService = inject(BaseService);
  public popoverState = signal<'open' | 'closed'>('closed');
  listaCliente: any[] = [];
  listaUsuario: Box[] = [];
  public primaryKey = 'id_usuariocliente';
  public endpoint = 'cliente';
  public listagem: Usuariocliente[] = [];

  onPopoverStateChange(state: 'open' | 'closed') {
    this.popoverState.set(state);
  }

  ngOnInit(): void {
    this.consultarCliente();
    this.itemTemp.tp_status = 'ATIVO';
  }

  obterVinculos(id: number) {
    this.baseService
      .findById(`${this.endpoint}/obter-cliente-usuario`, id)
      .subscribe({
        next: (res) => {
          const novaListagem: Usuariocliente[] = [];
          Object.values(res as any).forEach((index: any) => {
            const item = new Usuariocliente();
            item.id_usuariocliente = index.id_usuariocliente;
            item.id_cliente = index.cliente.id_cliente;
            item.id_usuario = index.id_usuario;
            item.nm_cliente = index.cliente.nm_cliente;
            item.tp_status = index.cliente.tp_status;
            novaListagem.push(item);
          });
          this.listagem = novaListagem;
        },
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['objeto']) {
      const item = new Box();
      item.value = String(this.objeto.id);
      item.label = this.objeto.nome;
      this.listaUsuario = [item];
      this.itemTemp.id_usuario = this.objeto.id
      this.obterVinculos(this.objeto.login);
    }
  }

  limparCampos() {
    this.itemTemp = {
      ...this.itemTemp,
      id_usuario: 0,
      id_cliente: 0,
      tp_status: 'ATIVO',
    };
  }

  consultarCliente() {
    this.baseService.findAll(`${this.endpoint}/`).subscribe({
      next: (res) => {
        this.listaCliente = (res as any).map((index: any) => {
          const item = new Box();
          item.value = String(index.id_cliente);
          item.label = index.nm_cliente;
          return item;
        });
      },
    });
  }

  getClienteLabel(id: number | string): string {
    const obj = this.listaCliente.find((c) => c.value == String(id));
    return obj ? obj.label : 'Sem objeto';
  }

  adicionarItem() {
    if (!this.objeto[this.nomeItem]) this.objeto[this.nomeItem] = [];

    if (!this.validarItens()) return;

    this.baseService
      .create(`${this.endpoint}/cadastrar-usuario-cliente`, this.itemTemp)
      .subscribe({
        next: (res) => {
           this.obterVinculos(this.objeto.login);
        },
      });

    this.limparCampos();
    this.objetoChange.emit(this.objeto);
    this.popoverState.set('closed');
  }

  validarItens(): any {
    try {
      VinculoClienteSchema.parse([this.itemTemp]);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        this.errorValidacao = {};
        error.issues.forEach((e) => {
          const value = e.path[1];
          this.errorValidacao[String(value)] = e.message;
        });

        return false;
      }
    }
  }

  editarItem(item: any) {
    this.popoverState.set('open');
    this.itemTemp = { ...item };
  }

  removerItem(item: any) {
    this.limparCampos();
    this.baseService
      .deleteById(
        `${this.endpoint}/remover-usuario-cliente`,
        Number(item.id_usuariocliente)
      )
      .subscribe({
        next: (res) => {
          this.obterVinculos(this.objeto.login);
        },
      });
  }
}
