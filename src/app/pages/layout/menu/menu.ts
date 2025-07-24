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
import { Usuario } from '../../../models/usuario';
import { EventService } from '../../../services/event.service';

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
  nm_inicial = '';
  id_usuario = 0;
  private auth = inject(AuthService);
  public objeto: Usuario = new Usuario();
  private eventService = inject(EventService)
  constructor(public themeService: ThemeService) {}

  sidebarOpen = false;
  isMobile = false;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.obterUsuarioLogado(user.id_usuario);
      }
    });

    this.eventService.userReload$.subscribe((id:number) => {
      this.obterUsuarioLogado(id);
    });

    window.innerWidth < 768
      ? (this.sidebarOpen = false)
      : (this.sidebarOpen = true);

    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  obterUsuarioLogado(id: number) {
    this.auth.findById(id).subscribe({
      next: (res) => {
        this.objeto.id = res.userId;
        this.objeto.login = res.userLogin;
        this.objeto.nome = res.userNome;
        this.nm_inicial = formatarInicialNome(res.userNome);
        this.objeto.img = res.userImg;
      },
    });
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
