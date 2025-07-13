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
  ],
  templateUrl: './lancamentoform.html',
  styleUrl: './lancamentoform.scss',
})
export class Lancamentoform {
  fb = inject(FormBuilder);

  form!: FormGroup;

  

  ngOnInit() {
    this.form = this.fb.group({
      cd_lancamento: ['', Validators.required],
      ds_lancamento: ['', Validators.required],
      dt_anomes: ['', Validators.required],
      dt_lancamento: ['', Validators.required],
      id_centrocusto: [0, Validators.required],
      vl_total: [0, Validators.required],
      itens: this.fb.array([]),
    });

    // inicializar com um item
    this.adicionarItem();
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  adicionarItem() {
    const item = this.fb.group({
      cd_itemlancamento: ['', Validators.required],
      id_categoria: [0, Validators.required],
      vl_itemlancamento: [0, Validators.required],
    });
    this.itens.push(item);
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dados do formulário:', this.form.value);
  }
}
