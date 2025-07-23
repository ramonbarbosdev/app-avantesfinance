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

@Component({
  selector: 'app-perfil',
  imports: [InputCustom, CommonModule, FormsModule, HlmButtonDirective],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  imagemPerfil: string = '';
  selectedFile: File | null = null;

  public  urlBase = `${environment.apiUrl}`;

  public errorValidacao: Record<string, string> = {};
  public objeto: Usuario = new Usuario();

  private auth = inject(AuthService);

  ngOnInit(): void {

     this.obterUsuarioLogado()
  }

  obterUsuarioLogado()
  {
    this.auth.findById(1).subscribe({
      next: (res) =>
      {
        this.objeto.id = res.userId;
        this.objeto.login = res.userLogin;
        this.objeto.nome = res.userNome;
        this.objeto.nome = res.userNome;
        this.objeto.img = res.userImg;
        this.imagemPerfil = `${this.urlBase}${this.objeto.img}`;
      }

    })
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

    this.auth.uploadFotoPerfil(1, formData).subscribe({
      next: (res) => {
      },
    });
  }

  onSalvar(): void {
    if (!this.validarItens()) return;


    this.auth.updateUser(this.objeto).subscribe({
      next: (res) =>
      {
        this.atualizarFoto(); 
      }
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
