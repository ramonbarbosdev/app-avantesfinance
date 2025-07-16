import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import {
  NgxMaskDirective,
} from 'ngx-mask';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeClosed } from '@ng-icons/lucide';

@Component({
  selector: 'app-money-custom',
  imports: [
    HlmLabelDirective,
    HlmFormFieldModule,
    HlmInputDirective,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucideEye, lucideEyeClosed })],
  templateUrl: './money-custom.html',
  styleUrl: './money-custom.scss',
})
export class MoneyCustom {
  @Input() label!: string;
  @Input() inputId!: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() error: string | null = null;

  @Input()
  set model(val: number | null) {
    // if (typeof val !== 'number' && val !== null) {
    //   throw new Error(
    //     `[MoneyCustom] model deve ser number ou null, mas recebeu: ${typeof val}`
    //   );
    // }

    this._model = val;
    this.valorFormatado = this.formatarValor(val);
  }
  get model(): number | null {
    return this._model;
  }

  @Output() modelChange = new EventEmitter<number | null>();

  _model: number | null = null;
  valorFormatado: string = '';

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const valorRaw = input.value.replace(/[^\d]/g, '');
    const valorNumerico = parseFloat(valorRaw) / 100;

    if (isNaN(valorNumerico)) {
      this._model = null;
      this.modelChange.emit(null);
      return;
    }

    this._model = valorNumerico;
    this.valorFormatado = this.formatarValor(this._model);
    this.modelChange.emit(this._model);
  }

  private formatarValor(valor: number | null): string {
    if (valor == null) return '';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

