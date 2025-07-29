import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
  computed,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideChevronsUpDown,
  lucideSearch,
} from '@ng-icons/lucide';

import { BrnCommandImports } from '@spartan-ng/brain/command';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmPopoverContentDirective } from '@spartan-ng/helm/popover';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

type Framework = { label: string; value: string };

@Component({
  selector: 'app-combobox',
  standalone: true,
  imports: [
    BrnCommandImports,
    HlmCommandImports,
    NgIcon,
    HlmIconDirective,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    CommonModule,
    HlmLabelDirective,
    HlmFormFieldModule,
  ],
  providers: [
    provideIcons({ lucideChevronsUpDown, lucideSearch, lucideCheck }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Combobox),
      multi: true,
    },
  ],
  templateUrl: './combobox.html',
  styleUrl: './combobox.scss',
})
export class Combobox implements ControlValueAccessor, OnChanges {
  @Input() label!: string;
  @Input() options: Framework[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() width: string = 'w-full';
  @Output() selectedChange = new EventEmitter<string>();
  @Input() error: string | null = null;
  @Input() disabled = false;
  @Input() dualDisplay = false
  
  @Input() model: any;
  @Output() modelChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] || changes['options']) {
      this.tentarSelecionarValor();
    }
  }
  private tentarSelecionarValor() {
    if (!this.model || this.options.length === 0) {
      this.currentFramework.set(undefined);
      return;
    }

    const found = this.options.find((f) => f.value === String(this.model));
    this.commandSelected(found);
  }

  public state = signal<'open' | 'closed'>('closed');
  private searchTerm = signal('');
  public currentFramework = signal<Framework | undefined>(undefined);

  public filteredOptions = computed(() =>
    this.options.filter((f) =>
      f.label.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.model = value;
    this.tentarSelecionarValor();

    const found = this.options.find((f) => f.value === value);
    this.currentFramework.set(found);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.searchTerm.set(value);
  }

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(framework: any) {
    this.currentFramework.set(framework);
    this.state.set('closed');
    this.model = framework.value;
    this.onChange(framework.value); // notifica o form
    this.modelChange.emit(framework.value); // atualiza two-way binding
    this.onTouched(); // marca como tocado
    this.selectedChange.emit(framework.value); // evento externo
  }
}
