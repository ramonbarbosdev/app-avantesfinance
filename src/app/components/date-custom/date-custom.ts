import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { HlmDatePickerComponent } from '@spartan-ng/helm/date-picker';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-custom',
  standalone: true,
  imports: [
    CommonModule,
    HlmDatePickerComponent,
    HlmFormFieldModule,
    HlmLabelDirective,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateCustom),
      multi: true,
    },
  ],
  templateUrl: './date-custom.html',
})
export class DateCustom implements ControlValueAccessor, OnInit {
  @Input() label = 'Data';
  @Input() minDate = new Date(2000, 0, 1);
  @Input() maxDate = new Date(2030, 11, 31);

  internalControl = new FormControl();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.internalControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(value: any): void {
     const parsed = value ? new Date(value) : null;

     if (parsed instanceof Date && !isNaN(parsed.getTime())) {
       this.internalControl.setValue(parsed, { emitEvent: false });
     } else {
       this.internalControl.setValue(null, { emitEvent: false });
     }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.internalControl.disable() : this.internalControl.enable();
  }
}
