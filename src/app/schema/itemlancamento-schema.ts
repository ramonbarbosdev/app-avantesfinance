import { z } from 'zod';

export const ItemLancametosSchema = z.object({
  cd_itemlancamento: z.string().min(1, 'Código é obrigatório'),
  id_categoria: z.preprocess((val) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? null : num;
    }
    if (typeof val === 'number') return val;
    return null;
  }, z.number('Categoria é obrigatório').min(1, 'Categoria é obrigatório')),
  vl_itemlancamento: z.preprocess((val) => {
    if (typeof val === 'number') return val;
    return null;
  }, z.number('Valor deve ser maior que 0').min(1, 'Valor deve ser maior que 0')),
});

export const ItemLancametoSchema = z.array(ItemLancametosSchema);
