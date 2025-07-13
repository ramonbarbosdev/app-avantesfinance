import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-lancamentodetalheform',
  imports: [CommonModule, InputCustom, HlmButtonDirective, ReactiveFormsModule],
  templateUrl: './lancamentodetalheform.html',
  styleUrl: './lancamentodetalheform.scss',
})
export class Lancamentodetalheform {
  @Input() fb!: any;
  @Input() form!: FormGroup;
  @Input() formControlName!: string;

  @Input() itens!: FormArray;

  getItemFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  adicionarItem() {
    this.itens.push(
      this.fb.group({
        cd_itemlancamento: [''],
        id_categoria: [''],
        vl_itemlancamento: [''],
      })
    );
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }
}
