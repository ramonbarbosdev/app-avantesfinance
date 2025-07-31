import { z } from 'zod';

export const UsuariosSchema = z.object({
  nome: z.string('O Nome é obrigatório').min(1, 'O Nome é obrigatório'),
  login: z.string('O Login é obrigatório').min(1, 'O Login é obrigatório'),
  senha: z.string('O Senha é obrigatório').min(1, 'O Senha é obrigatório'),
  role: z.string('O Acesso é obrigatória').min(1, 'A Acesso é obrigatória'),
});

export const UsuarioSchema = z.array(UsuariosSchema);
