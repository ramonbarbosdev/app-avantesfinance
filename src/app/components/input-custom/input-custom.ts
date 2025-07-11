import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

@Component({
  selector: 'app-input',
  imports: [HlmFormFieldModule, HlmInputDirective, HlmLabelDirective],
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

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.modelChange.emit(value);
  }
}
