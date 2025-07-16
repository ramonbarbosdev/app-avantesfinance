import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-lancamentodetalheform',
  imports: [
    CommonModule,
    InputCustom,
    HlmButtonDirective,
    ReactiveFormsModule,
    FormsModule,
    MoneyCustom,
  ],
  templateUrl: './lancamentodetalheform.html',
  styleUrl: './lancamentodetalheform.scss',
})
export class Lancamentodetalheform implements OnInit {
  @Input() objeto: any;
  @Output() objetoChange = new EventEmitter<any>();

  @Input() itemTemp: any;
  @Input() nomeItem!: string;
  @Input() relacionado: any;

  indexEditando: number | null = null;

  ngOnInit(): void {}

  limparCampos() {
    this.itemTemp = {
      id_categoria: null,
      id_metodopagamento: null,
      id_tipooperacao: null,
      vl_movimento: null,
    };
  }

  atualizarValor(valorAtualizado: any) {
    this.objeto = valorAtualizado;
    this.objetoChange.emit(this.objeto);
  }

  adicionarItem() {
    const { cd_itemlancamento, id_categoria, vl_itemlancamento } =
      this.itemTemp || {};

    if (!this.objeto[this.nomeItem]) this.objeto[this.nomeItem] = [];

    if (this.indexEditando != null) {
      this.objeto[this.nomeItem][this.indexEditando] = { ...this.itemTemp };
      this.indexEditando = null;
    } else {
      this.objeto[this.nomeItem].push({ ...this.itemTemp });
    }

    this.limparCampos();

    this.objetoChange.emit(this.objeto);
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

  atualizarValorItem(index: number, valor: number | null) {
    this.objeto.itens[index].vl_itemlancamento = valor ?? 0;

    this.objeto.vl_total = this.objeto.itens
      .map((item: any) => item.vl_itemlancamento ?? 0)
      .reduce((acc: any, curr: any) => acc + curr, 0);
  }
}
