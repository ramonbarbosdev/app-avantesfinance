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
import { ItemEmprestimo } from '../../../models/item-emprestimo';
import { EmprestimoService } from '../../../services/emprestimo.service';
import { BaseService } from '../../../services/base.service';
import { Observable } from 'rxjs';
import { ZodError } from 'zod';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';
import { DateCustom } from '../../../components/date-custom/date-custom';
import { MoneyCustom } from '../../../components/money-custom/money-custom';
import { Combobox } from '../../../components/combobox/combobox';
import { InputCustom } from '../../../components/input-custom/input-custom';
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
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { CommonModule } from '@angular/common';
import { Box } from '../../../models/box';

@Component({
  selector: 'app-emprestimodetalheform',
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
    InputCustom,
    Combobox,
    MoneyCustom,
    DateCustom,
  ],
  templateUrl: './emprestimodetalheform.html',
  styleUrl: './emprestimodetalheform.scss',
})
export class Emprestimodetalheform implements OnChanges, OnInit {
  @Input() objeto: any;
  @Output() objetoChange = new EventEmitter<any>();

  @Input() itemTemp: ItemEmprestimo = new ItemEmprestimo();
  @Input() nomeItem!: string;
  @Input() relacionado: any;

  categoriasMap: Map<number, string> = new Map();
  id_lancamento = 0;
  indexEditando: number | null = null;
  listaStatus: any[] = [];
  public errorValidacao: Record<string, string> = {};
  public popoverState = signal<'open' | 'closed'>('closed');
  service = inject(EmprestimoService);
  baseService = inject(BaseService);
  public primaryKey = 'id_emprestimo';
  public endpoint = 'emprestimo';

  onPopoverStateChange(state: 'open' | 'closed') {
    if (state == 'closed') this.limparCampos();
    this.popoverState.set(state);
  }

  ngOnInit(): void {
    this.obterTipoEmprestimo()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['objeto']) {
      this.onSeq();
      this.atualizarValorItem();
    }
  }

  onSeq(): any {
    this.obterSequencia().subscribe({
      next: (res: any) => {
        let novaSequencia = this.gerarSequenciaLista(res.sequencia);
        this.itemTemp.cd_itememprestimo = String(novaSequencia).padStart(
          3,
          '0'
        );
        return novaSequencia;
      },
      error: (err) => {
        console.error('Erro ao obter sequência:', err);
      },
    });
  }

  limparCampos() {
    this.itemTemp = {
      ...this.itemTemp,
      id_itememprestimo: 0,
      id_emprestimo: 0,
      dt_pagamento: '',
      dt_vencimento: '',
      tp_itemstatus: '',
      vl_emprestimo: 0,
    };
    this.onSeq();
  }

  atualizarValor(valorAtualizado: any) {
    this.objeto = valorAtualizado;
    this.objetoChange.emit(this.objeto);
  }

  obterSequencia(): Observable<string> {
    let id = this.objeto[this.primaryKey] ?? 0;
    return this.baseService.findSequenceDetalhe(this.endpoint, id);
  }

  adicionarItem() {
    if (!this.objeto[this.nomeItem]) this.objeto[this.nomeItem] = [];

      if (!this.validarItens()) return

        
        if (this.indexEditando != null)
        {
          this.objeto[this.nomeItem][this.indexEditando] = this.itemTemp;
          this.indexEditando = null;
        } else {
          if (this.objeto[this.primaryKey])
            this.itemTemp.id_emprestimo = this.objeto[this.primaryKey];
          this.objeto[this.nomeItem].push(this.itemTemp);
        }

        console.log(this.objeto);

        this.limparCampos();
        this.objetoChange.emit(this.objeto);
        this.popoverState.set('closed');
        this.atualizarValorItem();
      
  }

  validarItens(): any {
    try {
      // ItemLancametoSchema.parse([this.itemTemp]);
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

  gerarSequenciaLista(sequenciaApi: any) {
    const sequenciaInicial = parseInt(sequenciaApi, 10);
    let novaSequencia = sequenciaInicial;

    if (
      this.objeto[this.nomeItem] &&
      Array.isArray(this.objeto[this.nomeItem])
    ) {
      const sequenciasLocais = this.objeto[this.nomeItem]
        .map((item: any) => parseInt(item.cd_itememprestimo, 10))
        .filter((s: number) => !isNaN(s));

      while (sequenciasLocais.includes(novaSequencia)) {
        novaSequencia++;
      }
    }

    return novaSequencia;
  }

  editarItem(index: number) {
    this.popoverState.set('open');
    this.indexEditando = index;
    this.itemTemp = { ...this.objeto[this.nomeItem][index] };
    this.itemTemp.cd_itememprestimo = String(
      this.itemTemp.cd_itememprestimo
    ).padStart(3, '0');
    this.itemTemp.dt_pagamento = formatarDataParaInput(
      this.itemTemp.dt_pagamento
    );
    this.itemTemp.dt_vencimento = formatarDataParaInput(
      this.itemTemp.dt_vencimento
    );
  }

  removerItem(index: number) {
    this.limparCampos();
    this.objeto[this.nomeItem].splice(index, 1);
    this.objetoChange.emit(this.objeto);
    this.atualizarValorItem();
  }

  atualizarValorItem() {
    if (!this.objeto.itens) return;

    this.objeto.vl_total = this.objeto.itens
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);
  }

  obterTipoEmprestimo(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.baseService.findAll(`${this.endpoint}/status-emprestimo`).subscribe({
        next: (res) => {
          this.listaStatus = (res as any).map((index: any) => {
            const item = new Box();
            item.value = index;
            item.label = index;
            return item;
          });
        },
        error: (err) => reject(err),
      });
    });
  }
}
