import { z } from 'zod';

export const RegistrarItemSchema = z.object({
  id_centrocusto: z.preprocess((val) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? null : num;
    }
    if (typeof val === 'number') return val;
    return null;
  }, z.number('Centro de custo é obrigatório').min(1, 'Centro de custo é obrigatório')),
});

export const RegistrarItensSchema = z.array(RegistrarItemSchema);