import { z } from 'zod';

export const CompetenciasSchema = z.object({
  cd_competencia: z
    .string('O Competencia é obrigatório')
    .min(1, 'O Competencia é obrigatório'),
  dt_competencia: z.preprocess((val) => {
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date('Data é obrigatória')),
  tp_status: z
    .string('O Status é obrigatório')
    .min(1, 'O Status é obrigatório'),
});

export const CompetenciaSchema = z.array(CompetenciasSchema);
