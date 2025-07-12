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
  ],
  templateUrl: './contaform.html',
  styleUrl: './contaform.scss',
})
export class Contaform implements OnInit {
  public objeto = {
    agency: '',
    account: '',
    cpf: '',
    password: '',
    connectorId: 0,
    accessToken: '',
  };

  private itemService = inject(ItemsService);
  private authService = inject(AuthService);
  private eventService =  inject(EventService)
  router = inject(Router);

  ngOnInit(): void {
    
  }

  cadastrar() {

     this.eventService.emitItemReload();
    this.objeto.connectorId = 612;
    this.objeto.accessToken = this.authService.getUser().pluggy.accessToken;

    this.itemService.createItem(this.objeto).subscribe({
      next: (res) => {
        this.eventService.emitItemReload();
        window.location.reload();
      },
    });
  }
}
