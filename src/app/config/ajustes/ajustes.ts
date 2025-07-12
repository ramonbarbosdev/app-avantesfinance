import { Component } from '@angular/core';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-ajustes',
  imports: [
    BrnSeparatorComponent,
    HlmSeparatorDirective,
    NgIcon,
    HlmIconDirective,
    RouterLink,
    RouterModule
  ],
  providers: [provideIcons({ lucideChevronRight })],
  templateUrl: './ajustes.html',
  styleUrl: './ajustes.scss',
})
export class Ajustes {}
