import { z } from 'zod';

export const CategoriasSchema = z.object({
  cd_categoria: z
    .string('O Codigo é obrigatório')
    .min(1, 'O Codigo é obrigatório'),
  nm_categoria: z.string('O Nome é obrigatório').min(1, 'O Nome é obrigatório'),
  tp_categoria: z.string('O Tipo é obrigatório').min(1, 'O Tipo é obrigatório'),
});

export const CategoriaSchema = z.array(CategoriasSchema);
