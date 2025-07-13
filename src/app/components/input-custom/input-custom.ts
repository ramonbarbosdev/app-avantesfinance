import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, forwardRef } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeClosed } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {
  NgxMaskDirective,
} from 'ngx-mask';

@Component({
  selector: 'app-input',
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmLabelDirective,
    CommonModule,
    NgIcon,
    HlmIconDirective,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideIcons({ lucideEye, lucideEyeClosed }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustom),
      multi: true,
    },
  ],
  templateUrl: './input-custom.html',
  styleUrl: './input-custom.scss',
})
export class InputCustom {
  @Input() type: any;
  @Output() modelChange = new EventEmitter<any>();

  @Input() label!: string;
  @Input() inputId!: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() width: string = 'w-full';

  @Input() formControl!: FormControl;

  @Input() mask!: string;

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.modelChange.emit(value);
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
}
