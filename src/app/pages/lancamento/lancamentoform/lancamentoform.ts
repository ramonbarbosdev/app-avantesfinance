import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
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
import { ZodError } from 'zod';
import { LancametosSchema } from '../../../schema/lancamento-schema.';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';

@Component({
  selector: 'app-lancamentoform',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    InputCustom,
    DateCustom,
    MoneyCustom,
    Combobox,
    Lancamentodetalheform,
    HlmFormFieldModule,
  ],
  templateUrl: './lancamentoform.html',
  styleUrl: './lancamentoform.scss',
})
export class Lancamentoform {
  public listaCentroCusto: Box[] = [];
  service = inject(LancamentoService);

  public objeto = {
    cd_lancamento: '',
    ds_lancamento: '',
    dt_anomes: '',
    dt_lancamento: '',
    id_centrocusto: 0,
    vl_total: 0,
    itemlancamento: [{ cd_itemlancamento: '', id_categoria: '', vl_itemlancamento: '' }],
  };

  public errorValidacao: Record<string, string> = {};

  ngOnInit() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    this.objeto.dt_anomes = `${ano}${mes}`;
    this.obterCentroCusto();
  }

  adicionarItem() {
    this.objeto.itemlancamento.push({
      cd_itemlancamento: '',
      id_categoria: '',
      vl_itemlancamento: '',
    });
  }

  salvar() {

    if(this.validarItens()) 
    {
          console.log(this.objeto);

          this.service.create(this.objeto).subscribe({
            next: (res) => {
              console.log(res);
            },
          });

    }




  }

  validarItens(): any {
    try {
      LancametosSchema.parse(this.objeto);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        this.errorValidacao = {};
        error.issues.forEach((e) => {
          const value = e.path[0];
          this.errorValidacao[String(value)] = e.message;
        });

        return false;
      }
    }
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
