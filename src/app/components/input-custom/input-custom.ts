import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeClosed } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

import { NgxMaskDirective } from 'ngx-mask';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input',
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmLabelDirective,
    CommonModule,
    NgIcon,
    HlmIconDirective,
    NgxMaskDirective,
    HlmFormFieldModule,
  ],
  providers: [provideIcons({ lucideEye, lucideEyeClosed })],
  templateUrl: './input-custom.html',
  styleUrl: './input-custom.scss',
})
export class InputCustom {
  @Input() model: any;
  @Input() type: any;
  @Output() modelChange = new EventEmitter<any>();

  @Input() label!: string;
  @Input() inputId!: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() mask!: string;
  @Input() error: string | null = null;

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.modelChange.emit(value);
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
