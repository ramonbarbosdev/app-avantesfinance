import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { HlmDatePickerComponent } from '@spartan-ng/helm/date-picker';

@Component({
  selector: 'app-date-custom',
  standalone: true,
  imports: [
    CommonModule,
    HlmFormFieldModule,
    HlmLabelDirective,
    HlmDatePickerComponent,
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
export class DateCustom implements ControlValueAccessor {
  @Input() label = 'Data';
  @Input() minDate = new Date(2000, 0, 1);
  @Input() maxDate = new Date(2030, 11, 31);

  value: Date | null = null;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj ? new Date(obj) : null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(event: any) {
      // this.value = event?.toISOString().split('T')[0]; ;
      this.value = event;
      this.onChange(event);
      this.onTouched();
      // console.log(this.value);
  }


}
