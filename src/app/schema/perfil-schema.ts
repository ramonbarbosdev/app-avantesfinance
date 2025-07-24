import { z } from 'zod';

export const PerfisSchema = z.object({
  nome: z.string('O Nome é obrigatório').min(1, 'O Nome é obrigatório'),

  login: z.string('O Login é obrigatório').min(1, 'O Login é obrigatório'),

  // roles: z
  //   .string('A Permissão é obrigatória')
  //   .min(1, 'A Permissão é obrigatória'),
});

export const PerfilSchema = z.array(PerfisSchema);
