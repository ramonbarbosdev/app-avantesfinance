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
import { LancamentoService } from '../../../services/lancamento.service';
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
import { InputCustom } from '../../../components/input-custom/input-custom';
import { Combobox } from '../../../components/combobox/combobox';
import { Box } from '../../../models/box';
import { MoneyCustom } from '../../../components/money-custom/money-custom';
import { ItemLancametoSchema } from '../../../schema/itemlancamento-schema';
import { ZodError } from 'zod';
import { ItemLancamento } from '../../../models/item-lancamento';
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
    }
  }

  onSeq() {
    this.obterSequencia().subscribe({
      next: (res: any) => {
        let novaSequencia = this.gerarSequenciaLista(res.sequencia);
        this.itemTemp.cd_itemlancamento = String(novaSequencia).padStart(
          3,
          '0'
        );
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
      id_categoria: 0,
      vl_itemlancamento: 0,
    };
    this.onSeq();
  }

  consultarCategoria() {
    this.service.findAll('categoria/').subscribe({
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

  service = inject(LancamentoService);

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
  }

  removerItem(index: number) {
    this.limparCampos();
    this.objeto[this.nomeItem].splice(index, 1);
    this.objetoChange.emit(this.objeto);
  }

  atualizarValorItem() {
    this.objeto.vl_total = this.objeto.itens
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);
  }
}
