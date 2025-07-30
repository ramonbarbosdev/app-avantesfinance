import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { InputCustom } from "../../../components/input-custom/input-custom";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { PerfilSchema } from '../../../schema/perfil-schema';
import { ZodError } from 'zod';
import { Usuario } from '../../../models/usuario';
import { environment } from '../../../../environment';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';
import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
} from '@spartan-ng/helm/avatar';
import { formatarInicialNome } from '../../../utils/InicialNome';
import { Combobox } from '../../../components/combobox/combobox';
import { Box } from '../../../models/box';
import { BaseService } from '../../../services/base.service';



@Component({
  selector: 'app-perfil',
  imports: [
    InputCustom,
    CommonModule,
    FormsModule,
    HlmButtonDirective,
    HlmAvatarImageDirective,
    Combobox,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  imagemPerfil: string = '';
  nm_inicial: string = '';
  selectedFile: File | null = null;
  public listaRole: Box[] = [];
  public urlBase = `${environment.apiUrl}`;

  public errorValidacao: Record<string, string> = {};
  public objeto: Usuario = new Usuario();
  private eventService = inject(EventService);

  private auth = inject(AuthService);
  private router = inject(Router);
  private baseService = inject(BaseService);

  ngOnInit(): void {
    this.objeto.id = this.auth.getUser()?.id_usuario;
    this.objeto.id_cliente = this.auth.getUser()?.id_cliente;
    if (!this.objeto.roles) this.objeto.roles = [];
    this.obterUsuarioLogado();
  }

  obterUsuarioLogado() {
    this.baseService.findById("usuario", this.objeto.id).subscribe({
      next: (res) => {
        this.objeto.id = res.userId;
        this.objeto.login = res.userLogin;
        this.objeto.nome = res.userNome;
        this.nm_inicial = formatarInicialNome(res.userNome);
        this.objeto.img = res.userImg;
        this.imagemPerfil = `${this.urlBase}${this.objeto.img}`;
        this.objeto.role = res.roles[0];

        this.listaRole = (res.roles as any).map((index: any) => {
          const item = new Box();
          item.value = String(index);
          item.label = index;
          return item;
        });
      },
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selecionarNovaImagem(): void {
    this.fileInput.nativeElement.click();
  }

  carregarImagem(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPerfil = reader.result as string;
        this.objeto.img = this.imagemPerfil;
      };
      reader.readAsDataURL(file);
    }
  }

  atualizarFoto() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.auth.uploadFotoPerfil(this.objeto.id, formData).subscribe({
      next: (res) => {},
    });
  }

  onSalvar(): void {
    if (!this.validarItens()) return;

    this.auth.updateUser(this.objeto).subscribe({
      next: (res) => {
        this.atualizarFoto();
        this.eventService.emitUserReload(
          this.objeto.id,
          this.objeto.id_cliente
        );
        // window.location.reload();
        this.router.navigate(['client/ajustes']);
      },
    });
  }

  validarItens(): any {
    try {
      PerfilSchema.parse([this.objeto]);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        this.errorValidacao = {};
        error.issues.forEach((e) => {
          const value = e.path[1];
          this.errorValidacao[String(value)] = e.message;
        });

        return false;
      }
    }
  }
}
