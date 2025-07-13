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
  ],
  templateUrl: './contaform.html',
  styleUrl: './contaform.scss',
})
export class Contaform implements OnInit {
  fb = inject(FormBuilder);

  form = new FormGroup({
    agency: new FormControl('', Validators.required),
    account: new FormControl('', Validators.required),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11)
    ]),
    password: new FormControl('', Validators.required),
    connectorId: new FormControl(0),
    accessToken: new FormControl(''),
  });

  private itemService = inject(ItemsService);
  private authService = inject(AuthService);
  private eventService = inject(EventService);
  router = inject(Router);

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   agency: ['', Validators.required],
    //   account: ['', Validators.required],
    //   cpf: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.pattern(/^\d{3}\.\d{3}\.\d{2}-\d{2}$/),
    //     ],
    //   ],
    //   password: ['', Validators.required],
    // });
  }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const objeto = this.form.value;
    objeto.connectorId = 612;
    objeto.accessToken = this.authService.getUser().pluggy.accessToken;
    console.log(objeto);
    // this.itemService.createItem(this.objeto).subscribe({
    //   next: (res) => {
    //     this.eventService.emitItemReload();
    //     window.location.reload();
    //   },
    // });
  }
}
