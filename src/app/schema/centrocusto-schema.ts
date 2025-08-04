import { z } from 'zod';

export const CentroCustosSchema = z.object({
  cd_centrocusto: z
    .string('O Codigo é obrigatório')
    .min(1, 'O Codigo é obrigatório'),
  ds_centrocusto: z
    .string('O Descrição é obrigatório')
    .min(1, 'O Descrição é obrigatório'),
  nm_centrocusto: z
    .string('O Nome é obrigatório')
    .min(1, 'O Nome é obrigatório'),
});

export const CentroCustoSchema = z.array(CentroCustosSchema);
