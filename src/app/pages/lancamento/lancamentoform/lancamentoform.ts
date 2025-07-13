import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { Lancamentodetalheform } from "../lancamentodetalheform/lancamentodetalheform";
import { InputCustom } from "../../../components/input-custom/input-custom";

@Component({
  selector: 'app-lancamentoform',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    Lancamentodetalheform,
    InputCustom,
  ],
  templateUrl: './lancamentoform.html',
  styleUrl: './lancamentoform.scss',
})
export class Lancamentoform {
  fb = inject(FormBuilder);

  form = new FormGroup({
    cd_lancamento: new FormControl('', Validators.required),
    ds_lancamento: new FormControl('', [Validators.required]),
    dt_anomes: new FormControl('', [Validators.required]),
    dt_lancamento: new FormControl('', [Validators.required]),
    id_centrocusto: new FormControl('', [Validators.required]),
    vl_total: new FormControl('', [Validators.required]),
    itens: this.fb.array([]),
  });

  ngOnInit() {
    // inicializar com um item
    // this.adicionarItem();
  }

  adicionarItem() {
    this.itens.push(
      this.fb.group({
        cd_itemlancamento: [''],
        id_categoria: [''],
        vl_itemlancamento: [''],
      })
    );
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dados do formulário:', this.form.value);
  }
}
