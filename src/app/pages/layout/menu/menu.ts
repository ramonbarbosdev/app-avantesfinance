import {
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
import { Combobox } from '../../../components/combobox/combobox';
import { Box } from '../../../models/box';
import { BaseService } from '../../../services/base.service';
import { formatAnoMes } from '../../../utils/formatAnoMes';
import { CompetenciaService } from '../../../services/competencia.service';
import { toast } from 'ngx-sonner';
import { ClienteService } from '../../../services/cliente.service';

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
    Combobox,
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
  nm_cliente = '';

  public urlBase = `${environment.apiUrl}`;
  router = inject(Router);
  private eventService = inject(EventService);
  private baseService = inject(BaseService);
  private competenciaService = inject(CompetenciaService);
  private auth = inject(AuthService);
  public objeto: Usuario = new Usuario();
  constructor(public themeService: ThemeService) {}
  private cdRef = inject(ChangeDetectorRef);
  public listaCompetencia: Box[] = [];

  id_competencia: string = this.competenciaService.getCompetencia() || '';
  sidebarOpen = false;
  isMobile = false;
  isLoading = false;
  // private isAdmin =  false;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.obterUsuarioLogado(user.id_usuario, user.id_cliente, user.role);
        // this.isAdmin = user.role == "admin" ? true : false
      }
    });

    if (this.auth.getUser()?.id_usuario)
      this.obterUsuarioLogado(
        this.auth.getUser()?.id_usuario,
        this.auth.getUser()?.id_cliente,
        this.auth.getUser()?.role
      );

    this.obterCompetencia();

    this.eventService.userReload$.subscribe(
      ({ id_usuario, id_cliente, role }) => {
        this.obterUsuarioLogado(id_usuario, id_cliente, role);
        this.cdRef.detectChanges();
      }
    );

    window.innerWidth < 768
      ? (this.sidebarOpen = false)
      : (this.sidebarOpen = true);

    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  obterUsuarioLogado(id_usuario: number, id_cliente: number, role:string) {
    this.auth.findByUsuarioByCliente(id_usuario, id_cliente).subscribe({
      next: (res) => {
        console.log(res.usuario.roles[0].nomeRole);
        this.objeto.id = res.usuario.id;
        this.objeto.login = res.usuario.login;
        this.objeto.nome = res.usuario.nome;
        this.nm_inicial = formatarInicialNome(res.usuario.nome);
        this.objeto.img = res.usuario.img;
        this.objeto.id_cliente = id_cliente;
        this.nm_cliente = res.cliente.nm_cliente;
        this.objeto.role =
          res.usuario.roles[0].nomeRole == 'ROLE_ADMIN' && role == 'admin'
            ? role
            : 'client'; 
        this.imagemPerfil = `${this.urlBase}${this.objeto.img}`;
      },
      error: (e) => {},
    });
  }

  obterCompetencia() {
    this.baseService.findAll('competencia/').subscribe({
      next: (res) => {
        this.listaCompetencia = (res as any).map((index: any) => {
          const item = new Box();
          item.value = String(index.cd_competencia);
          item.label = formatAnoMes(index.cd_competencia);
          return item;
        });
      },
    });
  }
  obterCompetenciaAtual() {
    this.baseService.findAll('competencia/atual').subscribe({
      next: (res) => {
        let nomeCompetencia = formatAnoMes(res.cd_competencia);
        this.id_competencia = res.cd_competencia;
        toast(`Competência de ${nomeCompetencia} selecionada.`, {
          description: `Mês está ${res.tp_status}`,
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
      },
    });
  }

  onSelecionarCompetencia(valor: string) {
    if (this.competenciaService.getCompetencia() != valor) {
      this.competenciaService.setCompetencia(valor);
      this.router.navigate(['client/home']);
      this.obterCompetenciaAtual();
    }
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
