import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { Lancamentodetalheform } from '../lancamentodetalheform/lancamentodetalheform';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { DateCustom } from '../../../components/date-custom/date-custom';
import { MoneyCustom } from '../../../components/money-custom/money-custom';
import { Box } from '../../../models/box';
import { LancamentoService } from '../../../services/lancamento.service';
import { Combobox } from '../../../components/combobox/combobox';

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
    DateCustom,
    MoneyCustom,
    Combobox
  ],
  templateUrl: './lancamentoform.html',
  styleUrl: './lancamentoform.scss',
})
export class Lancamentoform {
  fb = inject(FormBuilder);

  public listaCentroCusto: Box[] = [];
  service = inject(LancamentoService);

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
    this.adicionarItem();

    const data = new Date();
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');

    this.form.get('dt_anomes')?.setValue(`${ano}${mes}`);

    this.obterCentroCusto();
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

  obterCentroCusto() {
    this.service.findAll('centrocusto/').subscribe({
      next: (res) => {
        Object.values(res as any).forEach((index: any) => {
          const item = new Box();
          (item.value = String(index.id_centrocusto)),
            (item.label = index.nm_centrocusto);
          this.listaCentroCusto = [...this.listaCentroCusto, item];
        });
      },
    });
  }
}
