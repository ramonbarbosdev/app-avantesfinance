import { Component, inject, OnInit } from '@angular/core';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { InputCustom } from '../../../components/input-custom/input-custom';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { AuthService } from '../../../auth/auth.service';
import { ItemsService } from '../../../services/items.service';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Combobox } from "../../../components/combobox/combobox";
import { PluggyService } from '../../../services/pluggy.service';
import { Conector } from '../../../models/conector';

@Component({
  selector: 'app-contaform',
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
    InputCustom,
    ReactiveFormsModule,
    Combobox,
  ],
  templateUrl: './contaform.html',
  styleUrl: './contaform.scss',
})
export class Contaform implements OnInit {
  fb = inject(FormBuilder);

  public listaConectores: Conector[] = [];

  form = new FormGroup({
    agency: new FormControl('', Validators.required),
    account: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
    password: new FormControl('', Validators.required),
    connectorId: new FormControl('', Validators.required),
    accessToken: new FormControl(''),
  });

  private itemService = inject(ItemsService);
  private pluggyService = inject(PluggyService);
  private authService = inject(AuthService);
  private eventService = inject(EventService);
  router = inject(Router);

  ngOnInit(): void {
    this.obterConectores();
  }

  obterConectores() {
    let apiKey = this.authService.getUser().pluggy.apiKey;
    this.pluggyService.findConectors(apiKey).subscribe({
      next: (res) => {
        Object.values(res as any).forEach((index: any) => {
          const item = new Conector();
          (item.value = String(index.id)), (item.label = index.name);
          item.isOpenFinance = index.isOpenFinance;
          this.listaConectores = [...this.listaConectores, item];
        });
      },
    });
  }

  cadastrar() {
    const objeto = this.form.value;
    objeto.accessToken = this.authService.getUser().pluggy.accessToken;

    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }



    this.itemService.createItem(objeto).subscribe({
      next: (res) => {
        this.eventService.emitItemReload();
        window.location.reload();
      },
    });
  }
}
