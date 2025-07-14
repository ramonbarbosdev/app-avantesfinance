import { z } from 'zod';

export const LancametosSchema = z.object({
  cd_lancamento: z.string().min(1, 'Código é obrigatório'),
  dt_anomes: z.string().min(1, 'Mês é obrigatório'),
  id_centrocusto: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().min(1, 'Centro de custo é obrigatório')
  ),
  dt_lancamento: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      const date = new Date(val);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return val;
  }, z.date('Data é obrigatória')),
  vl_total: z.number().positive('Valor deve ser maior que 0'),
});

export const LancametoSchema = z.array(LancametosSchema);
