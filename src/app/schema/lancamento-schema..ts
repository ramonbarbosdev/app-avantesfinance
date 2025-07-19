import { z } from 'zod';

export const LancametosSchema = z.object({
  cd_lancamento: z.string().min(1, 'Código é obrigatório'),
  dt_anomes: z.string().min(1, 'Mês é obrigatório'),
  id_centrocusto: z.preprocess((val) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? null : num;
    }
    if (typeof val === 'number') return val;
    return null; 
  }, z.number('Centro de custo é obrigatório').min(1, 'Centro de custo é obrigatório')),
  dt_lancamento: z.preprocess((val) => {
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date('Data é obrigatória')),
  // vl_total: z.number().positive('Valor deve ser maior que 0'),
});

export const LancametoSchema = z.array(LancametosSchema);
