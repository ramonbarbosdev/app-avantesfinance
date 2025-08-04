import { CommonModule } from '@angular/common';
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
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { Observable } from 'rxjs';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2, lucideCheck, lucideSquarePen } from '@ng-icons/lucide';
import { HlmTableImports } from '@spartan-ng/helm/table';

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

import { ZodError } from 'zod';
import { Combobox } from '../../../../components/combobox/combobox';
import { InputCustom } from '../../../../components/input-custom/input-custom';
import { MoneyCustom } from '../../../../components/money-custom/money-custom';
import { DateCustom } from '../../../../components/date-custom/date-custom';
import { ItemLancamento } from '../../../../models/item-lancamento';
import { BaseService } from '../../../../services/base.service';
import { Box } from '../../../../models/box';
import { ItemLancametoSchema } from '../../../../schema/itemlancamento-schema';
import { formatarDataParaInput } from '../../../../utils/formatarDataParaInput';
import { LancamentoService } from '../../../../services/lancamento.service';

@Component({
  selector: 'app-lancamentodetalheform',
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
  providers: [provideIcons({ lucideTrash2, lucideCheck, lucideSquarePen })],

  templateUrl: './lancamentodetalheform.html',
  styleUrl: './lancamentodetalheform.scss',
})
export class Lancamentodetalheform implements OnChanges, OnInit {
  @Input() objeto: any;
  @Output() objetoChange = new EventEmitter<any>();

  @Input() itemTemp: ItemLancamento = new ItemLancamento();
  @Input() nomeItem!: string;
  @Input() relacionado: any;

  categoriasMap: Map<number, string> = new Map();
  id_lancamento = 0;
  indexEditando: number | null = null;
  listaCategoria: any[] = [];
  public errorValidacao: Record<string, string> = {};
  public popoverState = signal<'open' | 'closed'>('closed');
  service = inject(LancamentoService);
  baseService = inject(BaseService);

  onPopoverStateChange(state: 'open' | 'closed') {
    if (state == 'closed') this.limparCampos();
    this.popoverState.set(state);
  }

  ngOnInit(): void {
    this.consultarCategoria();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['objeto']) {
      this.onSeq();
      this.atualizarValorItem();
    }
  }

  onSeq(): any {
    this.obterSequencia().subscribe({
      next: (res: any) => {
        let novaSequencia = this.gerarSequenciaLista(res.sequencia);
        this.itemTemp.cd_itemlancamento = String(novaSequencia).padStart(
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
      id_itemlancamento: 0,
      id_lancamento: 0,
      dt_itemlancamento: '',
      id_categoria: 0,
      vl_itemlancamento: 0,
      tp_categoria: '',
    };
    this.onSeq();
  }

  consultarCategoria() {
    this.baseService.findAll('categoria/').subscribe({
      next: (res) => {
        this.listaCategoria = (res as any).map((index: any) => {
          const item = new Box();
          item.value = String(index.id_categoria);
          item.label = index.nm_categoria;
          return item;
        });
      },
    });
  }

  atualizarValor(valorAtualizado: any) {
    this.objeto = valorAtualizado;
    this.objetoChange.emit(this.objeto);
  }

  obterSequencia(): Observable<string> {
    let id = this.objeto.id_lancamento ?? 0;
    return this.service.findSequenceDetalhe(id);
  }

  adicionarItem() {
    if (!this.objeto[this.nomeItem]) this.objeto[this.nomeItem] = [];

    if (this.validarItens()) {
      if (this.indexEditando != null) {
        this.objeto[this.nomeItem][this.indexEditando] = this.itemTemp;
        this.indexEditando = null;
      } else {
        if (this.objeto.id_lancamento)
          this.itemTemp.id_lancamento = this.objeto.id_lancamento;
        this.objeto[this.nomeItem].push(this.itemTemp);
      }

      this.limparCampos();
      this.objetoChange.emit(this.objeto);
      this.popoverState.set('closed');
      this.atualizarValorItem();
    }
  }

  validarItens(): any {
    try {
      ItemLancametoSchema.parse([this.itemTemp]);
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
        .map((item: any) => parseInt(item.cd_itemlancamento, 10))
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
    this.itemTemp.cd_itemlancamento = String(
      this.itemTemp.cd_itemlancamento
    ).padStart(3, '0');
    this.itemTemp.dt_itemlancamento = formatarDataParaInput(
      this.itemTemp.dt_itemlancamento
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

    this.objeto.vl_receitaacomulada = this.objeto.itens
      .filter((item: any) => item.tp_categoria === 'RECEITA')
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);

    this.objeto.vl_despesaacomulada = this.objeto.itens
      .filter((item: any) => item.tp_categoria === 'DESPESA')
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);
  }

  processarCategoria(event: any) {
    this.consultarCategoriaPorId(event);
  }

  consultarCategoriaPorId(id: number) {
    this.baseService.findById('categoria', id).subscribe({
      next: (res) => {
        this.itemTemp.tp_categoria = res.tp_categoria;
      },
    });
  }

  getCategoriaLabel(id_categoria: number | string): string {
    const categoria = this.listaCategoria.find(
      (c) => c.value == String(id_categoria)
    );
    return categoria ? categoria.label : 'Sem categoria';
  }
}
