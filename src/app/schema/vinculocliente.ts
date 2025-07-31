import { z } from 'zod';

export const VinculoClientesSchema = z.object({
  id_usuario: z
    .string('O Usuario é obrigatório')
    .min(1, 'O Cliente é obrigatório'),
  id_cliente: z
    .string('O Cliente é obrigatório')
    .min(1, 'O Cliente é obrigatório'),
});

export const VinculoClienteSchema = z.array(VinculoClientesSchema);
