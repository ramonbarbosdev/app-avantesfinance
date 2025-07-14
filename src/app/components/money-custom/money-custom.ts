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
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-money-custom',
  imports: [
    NgxMaskDirective,
    HlmLabelDirective,
    HlmFormFieldModule,
    HlmInputDirective,
    CommonModule,
    ReactiveFormsModule,
    NgIcon,
    HlmIconDirective,
  ],
  providers: [
    provideIcons({ lucideEye, lucideEyeClosed }),

    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyCustom),
      multi: true,
    },
  ],
  templateUrl: './money-custom.html',
  styleUrl: './money-custom.scss',
})
export class MoneyCustom {
  @Input() type: any;
  @Input() label!: string;
  @Input() inputId!: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() width: string = 'w-full';
  @Input() formControl!: FormControl;
  @Input() mask!: string;
  
  @Input()
  set model(val: number | null) {
    this._model = val;
    this.valorFormatado = this.formatarValor(val);
  }
  get model(): number | null {
    return this._model;
  }
  
  @Output() modelChange = new EventEmitter<any>();

  
  _model: number | null = null;
  valorFormatado: string = '';

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const valorRaw = input.value.replace(/[^\d]/g, '');
    const valorNumerico = parseFloat(valorRaw) / 100;

    this._model = isNaN(valorNumerico) ? null : valorNumerico;
    this.valorFormatado = this.formatarValor(this._model);
    this.modelChange.emit(this._model);
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //Form
  value: any = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(value: any) {
    this.value = value;
    this.onChange(value);
  }

  private formatarValor(valor: number | null): string {
    if (valor == null) return '';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

