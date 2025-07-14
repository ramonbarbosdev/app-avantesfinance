import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-lancamentodetalheform',
  imports: [
    CommonModule,
    InputCustom,
    HlmButtonDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './lancamentodetalheform.html',
  styleUrl: './lancamentodetalheform.scss',
})
export class Lancamentodetalheform {
  @Input() itens!: any;

  adicionarItem() {
  this.itens.push({
    cd_itemlancamento: '',
    id_categoria: '',
    vl_itemlancamento: 0,
  });

  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }
}
