import {
  ChangeDetectorRef,
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
import { environment } from '../../../../environment';
import { HlmSpinnerComponent } from '@spartan-ng/helm/spinner';

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
    HlmSpinnerComponent,
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
  imagemPerfil: string = '';
  public urlBase = `${environment.apiUrl}`;

  private auth = inject(AuthService);
  public objeto: Usuario = new Usuario();
  private eventService = inject(EventService);
  constructor(public themeService: ThemeService) {}
  private cdRef = inject(ChangeDetectorRef);

  sidebarOpen = false;
  isMobile = false;
  isLoading = false;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.obterUsuarioLogado(user.id_usuario);
      }
    });

    if (this.auth.getUser()?.id_usuario)
      this.obterUsuarioLogado(this.auth.getUser()?.id_usuario);

    this.eventService.userReload$.subscribe((id: number) => {
      this.obterUsuarioLogado(id);
      this.cdRef.detectChanges();
      // window.location.reload();
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
        this.imagemPerfil = `${this.urlBase}${this.objeto.img}`;
      },
      error: (e) => {
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
