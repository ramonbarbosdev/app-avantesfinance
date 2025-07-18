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

  @Input() itemTemp: any;
  @Input() nomeItem!: string;
  @Input() relacionado: any;

  indexEditando: number | null = null;
  listaCategoria: any[] = [];

  public popoverState = signal<'open' | 'closed'>('closed');

  onPopoverStateChange(state: 'open' | 'closed') {
    this.popoverState.set(state);
  }

  ngOnInit(): void {
    this.obterCategoria();
    this.consultarCategoria();
    this.onSeq();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['objeto']) {
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
      id_categoria: null,
      id_metodopagamento: null,
      id_tipooperacao: null,
      vl_movimento: null,
    };
  }

  categoriasMap: Map<number, string> = new Map();
  obterCategoria() {
    this.service.findAll('categoria/').subscribe({
      next: (res) => {
        res.forEach((item: any) => {
          this.categoriasMap.set(item.id_categoria, item.nm_categoria);
        });
      },
    });
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
    let id = this.objeto.id_lancamento ? this.objeto.id_lancamento : 0;
    return this.service.findSequenceDetalhe(id);
  }

  adicionarItem() {
    if (!this.objeto[this.nomeItem]) this.objeto[this.nomeItem] = [];

    if (this.indexEditando != null) {
      this.objeto[this.nomeItem][this.indexEditando] = this.itemTemp;
      this.indexEditando = null;
    } else {
      this.objeto[this.nomeItem].push(this.itemTemp);
    }
    this.limparCampos();
    this.objetoChange.emit(this.objeto);
    this.popoverState.set('closed');
  }

  gerarSequenciaLista(sequencia: any) {
    let sequenciaApi = parseInt(sequencia, 10);
    let novaSequencia = 0;

    if (this.objeto[this.nomeItem]) {
      const maiorSequenciaLocal = this.objeto[this.nomeItem]
        .map((item: any) => parseInt(item.cd_itemlancamento, 10))
        .reduce(
          (max: any, curr: any) => (isNaN(curr) ? max : Math.max(max, curr)),
          0
        );

      if (maiorSequenciaLocal == 0) {
        novaSequencia = Math.max(sequenciaApi, maiorSequenciaLocal);
      } else {
        novaSequencia = Math.max(sequenciaApi, maiorSequenciaLocal) + 1;
      }
    } else {
      novaSequencia = sequenciaApi;
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

  obterNomeRelacionado(id: number) {
    let retorno = this.categoriasMap.get(id) ?? '';
    return retorno;
  }

  atualizarValorItem(index: number, valor: number | null) {
    this.objeto.itens[index].vl_itemlancamento = valor ?? 0;

    this.objeto.vl_total = this.objeto.itens
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);
  }
}
