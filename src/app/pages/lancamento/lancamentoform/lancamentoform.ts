import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
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
import { Lancamento } from '../../../models/lancamento';
import { ItemLancamento } from '../../../models/item-lancamento';
import { ActivatedRoute } from '@angular/router';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';

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
  endpoint = 'lancamento';
  public objeto: Lancamento = new Lancamento();
  public objetoItemLancamento: ItemLancamento = new ItemLancamento();

  public errorValidacao: Record<string, string> = {};

  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  async ngOnInit() {
    await this.onShow();
  }

  async onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    this.objeto.dt_anomes = `${ano}${mes}`;
    this.objeto.vl_total = 0;

    await this.obterCentroCusto();

    if (!key) {
      this.obterSequencia();
    } else {
      this.onEdit(key);
    }
  }

  onEdit(id: any) {
    if (!id) return;

    this.service.findById(this.endpoint, id).subscribe({
      next: (res: any) => {
        res.dt_lancamento = formatarDataParaInput(res.dt_lancamento);
        this.objeto = res;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  obterSequencia() {
    this.service.findSequence().subscribe({
      next: (res) => {
        this.objeto.cd_lancamento = res.sequencia;
      },
    });
  }

  salvar() {
    if (this.validarItens()) {
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
  async obterCentroCusto(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.findAll('centrocusto/').subscribe({
        next: (res) => {
          this.listaCentroCusto = (res as any).map((index: any) => {
            const item = new Box();
            item.value = String(index.id_centrocusto);
            item.label = index.nm_centrocusto;
            return item;
          });
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }
}
