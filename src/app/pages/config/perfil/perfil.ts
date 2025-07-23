import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { InputCustom } from "../../../components/input-custom/input-custom";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [InputCustom, CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  nome = '';
  imagemPerfil = '';
  temaEscuro = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.nome = user?.nm_usuario || '';
    this.imagemPerfil = user?.imagemPerfil || '';
    
  }

  onSalvar(): void {
    const userAtualizado = {
      nm_usuario: this.nome,
      imagemPerfil: this.imagemPerfil,
    };
    // this.auth.atualizarPerfil(userAtualizado);
    alert('Perfil atualizado com sucesso!');
  }

 
}
