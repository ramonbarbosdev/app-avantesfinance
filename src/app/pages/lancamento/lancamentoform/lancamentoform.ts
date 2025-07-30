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
import { ActivatedRoute, Router } from '@angular/router';
import { formatarDataParaInput } from '../../../utils/formatarDataParaInput';
import { BaseService } from '../../../services/base.service';

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
  baseService = inject(BaseService);
  endpoint = 'lancamento';
  public objeto: Lancamento = new Lancamento();
  public objetoItemLancamento: ItemLancamento = new ItemLancamento();

  public errorValidacao: Record<string, string> = {};

  fl_edicao = false;

  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  async ngOnInit() {
    await this.onShow();
  }

  registroLancamento() {

    let fl_registro = false;
    this.route.queryParams.subscribe((params) => {
      const registro = params['data'];
      if (registro) {
        try {
          const obj = JSON.parse(registro);

          this.objeto = obj.objeto;

          this.cdr.detectChanges();

          fl_registro = true;
          this.fl_edicao = true;
          return ;
        } catch (e) {
          console.error('Erro ao parsear JSON:', e);
        }
      }
    });

    return fl_registro;
  }

  async onShow() {
    const key = this.route.snapshot.paramMap.get('id');

    await this.obterCentroCusto();

    if(this.registroLancamento()) return

    if (!key) {
      this.objeto.vl_total = 0;
      this.objeto.ds_lancamento = "";
      this.obterSequencia();
    } else {
      this.onEdit(key);
    }

  }

  onEdit(id: any) {
    if (!id) return;
    this.fl_edicao = true;

    this.baseService
      .findById(`${this.endpoint}/lista-por-competencia`, id)
      .subscribe({
        next: (res: any) => {
          res.dt_lancamento = formatarDataParaInput(res.dt_lancamento);
          res.cd_lancamento = String(res.cd_lancamento).padStart(3, '0');
          this.objeto = res;
          this.cdr.detectChanges();
        },
        error: (err) => {},
      });
  }

  obterSequencia() {
    this.baseService.findSequence("lancamento").subscribe({
      next: (res) => {
        this.objeto.cd_lancamento = res.sequencia;
      },
    });
  }

  salvar() {
    if (this.validarItens()) {
      this.baseService
        .createMestreDetalhe(this.endpoint, this.objeto)
        .subscribe({
          next: (res) => {
            if (this.fl_edicao) this.router.navigate(['client/lancamento']);
            if (!this.fl_edicao) window.location.reload();
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

  limparFormulario()
  {
    this.objeto = new Lancamento();
    this.onShow()
  }

  async obterCentroCusto(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.baseService.findAll('centrocusto/').subscribe({
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
