import { z } from 'zod';

export const ItemEmprestimosSchema = z.object({
  cd_itememprestimo: z.string().min(1, 'Código é obrigatório'),
  id_categoria: z.preprocess((val) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? null : num;
    }
    if (typeof val === 'number') return val;
    return null;
  }, z.number('Categoria é obrigatório').min(1, 'Categoria é obrigatório')),
  vl_emprestimo: z.preprocess((val) => {
    if (typeof val === 'number') return val;
    return null;
  }, z.number('Valor deve ser maior que 0').min(1, 'Valor deve ser maior que 0')),
  dt_vencimento: z.preprocess((val) => {
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date('Data vencimento é obrigatória')),
  dt_pagamento: z.preprocess((val) => {
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date('Data pagamento é obrigatória')),
  tp_itemstatus: z
    .string('O Tipo de status é obrigatória')
    .min(1, 'O Tipo de status é obrigatória'),
});

export const ItemEmprestimoSchema = z.array(ItemEmprestimosSchema);
