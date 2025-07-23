import {
  Component,
  inject,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
} from '@spartan-ng/helm/avatar';
import {
  lucidePanelLeftClose,
  lucidePanelRightClose,
  lucideBolt,
  lucideLogOut,
  lucideSunMoon,
} from '@ng-icons/lucide';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../auth/auth.service';
import { formatarInicialNome } from '../../../utils/InicialNome';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    RouterOutlet,
    NgIcon,
    HlmIconDirective,
    CommonModule,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    RouterLink,
  ],
  providers: [
    provideIcons({
      lucidePanelLeftClose,
      lucidePanelRightClose,
      lucideBolt,
      lucideLogOut,
      lucideSunMoon,
    }),
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  nm_usuario = '';
  nm_inicial = '';
  private auth = inject(AuthService);
  

  constructor(public themeService: ThemeService) {}

  sidebarOpen = false;
  isMobile = false;

  ngOnInit(): void {
     this.auth.user$.subscribe((user) => {
       if (user) {
         this.nm_usuario = user.nm_usuario;
         this.nm_inicial = formatarInicialNome(this.nm_usuario);
       }
     });

     this.nm_usuario = this.auth.getUser()?.nm_usuario;
     this.nm_inicial = formatarInicialNome(this.nm_usuario);

    window.innerWidth < 768
      ? (this.sidebarOpen = false)
      : (this.sidebarOpen = true);

    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  sair() {
    this.auth.logout();
  }
}
