import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import Swal from 'sweetalert2';
import { MoneyCustom } from '../../../components/money-custom/money-custom';
import { LancamentoService } from '../../../services/lancamento.service';
import { Observable } from 'rxjs';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2, lucideCheck, lucideSquarePen } from '@ng-icons/lucide';
import { HlmTableImports } from '@spartan-ng/helm/table';
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

  ngOnInit(): void {
    
    this.obterCategoria()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['objeto']) {
      // this.obterCategoria(this.objeto.);
    }
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

    this.obterSequencia().subscribe({
      next: (res: any) => {
        let novaSequencia = this.gerarSequenciaLista(res.sequencia);

        const itemComSequencia = {
          ...this.itemTemp,
          cd_itemlancamento: String(novaSequencia).padStart(3, '0'),
        };

        if (this.indexEditando != null) {
          this.objeto[this.nomeItem][this.indexEditando] = itemComSequencia;
          this.indexEditando = null;
        } else {
          this.objeto[this.nomeItem].push(itemComSequencia);
        }

        this.limparCampos();
        this.objetoChange.emit(this.objeto);
      },
      error: (err) => {
        console.error('Erro ao obter sequência:', err);
      },
    });
  }

  gerarSequenciaLista(sequencia: any) {
    let sequenciaApi = parseInt(sequencia, 10);

    const maiorSequenciaLocal = this.objeto[this.nomeItem]
      .map((item: any) => parseInt(item.cd_itemlancamento, 10))
      .reduce(
        (max: any, curr: any) => (isNaN(curr) ? max : Math.max(max, curr)),
        0
      );

    let novaSequencia = 0;
    if (maiorSequenciaLocal == 0) {
      novaSequencia = Math.max(sequenciaApi, maiorSequenciaLocal);
    } else {
      novaSequencia = Math.max(sequenciaApi, maiorSequenciaLocal) + 1;
    }

    return novaSequencia;
  }

  editarItem(index: number) {
    this.indexEditando = index;
    this.itemTemp = { ...this.objeto[this.nomeItem][index] };
  }

  removerItem(index: number) {
    this.limparCampos();
    this.objeto[this.nomeItem].splice(index, 1);
    this.objetoChange.emit(this.objeto);
  }

  obterNomeRelacionado(id: number) {
    return this.categoriasMap.get(id) ?? '';
  }


  atualizarValorItem(index: number, valor: number | null) {
    this.objeto.itens[index].vl_itemlancamento = valor ?? 0;

    this.objeto.vl_total = this.objeto.itens
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);
  }
}
