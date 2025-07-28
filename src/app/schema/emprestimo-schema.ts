import { z } from 'zod';

export const EmprestimosSchema = z.object({
  cd_emprestimo: z.string().min(1, 'Código é obrigatório'),
  id_centrocusto: z.preprocess((val) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? null : num;
    }
    if (typeof val === 'number') return val;
    return null;
  }, z.number('Centro de custo é obrigatório').min(1, 'Centro de custo é obrigatório')),
  dt_emprestimo: z.preprocess((val) => {
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date('Data é obrigatória')),
  vl_total: z.number().positive('Valor deve ser maior que 0'),
  tp_emprestimo: z
    .string('O Tipo de emprestimo é obrigatória')
    .min(1, 'O Tipo de emprestimo é obrigatória'),
  // tp_status: z
  //   .string('O Tipo de status é obrigatória')
  //   .min(1, 'O Tipo de status é obrigatória'),
});

export const EmprestimoSchema = z.array(EmprestimosSchema);
