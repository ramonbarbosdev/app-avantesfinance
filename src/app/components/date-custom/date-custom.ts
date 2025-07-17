import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class DateCustom implements ControlValueAccessor, OnChanges {
  @Input() label = 'Data';
  @Input() minDate = new Date(2000, 0, 1);
  @Input() maxDate = new Date(2030, 11, 31);
  @Input() error: string | null = null;

  @Input() model: any;
  @Output() modelChange = new EventEmitter<string>();

  value: Date | null = null;
  public data?: Date;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model']) {
      const parsedDate = new Date(this.model + 'T00:00:00'); 
      this.data = isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(obj: any): void {
    console.log(obj);

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
  }

  formatarData = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };
}
