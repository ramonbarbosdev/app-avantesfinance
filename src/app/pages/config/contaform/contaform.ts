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
import { CommonModule } from '@angular/common';

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
    CommonModule,
    FormsModule,

  ],
  templateUrl: './contaform.html',
  styleUrl: './contaform.scss',
})
export class Contaform implements OnInit {
 

  public listaConectores: Conector[] = [];

  public objeto = {
    agency: "",
    account: "",
    cpf:"",
    password:"",
    connectorId:0,
    accessToken:""
  }

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

    this.objeto.accessToken = this.authService.getUser().pluggy.accessToken;

    this.itemService.createItem(this.objeto).subscribe({
      next: (res) => {
        this.eventService.emitItemReload();
        window.location.reload();
      },
    });
  }
}
