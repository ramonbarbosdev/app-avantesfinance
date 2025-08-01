import { z } from 'zod';

export const ClientesSchema = z.object({
  nm_cliente: z.string('O Nome é obrigatório').min(1, 'O Nome é obrigatório'),
  nu_cnpjcpf: z
    .string('O CPF/CNPJ é obrigatório')
    .min(1, 'O CPF/CNPJ é obrigatório'),
  tp_status: z
    .string('O Status é obrigatório')
    .min(1, 'O Status é obrigatório'),
});

export const ClienteSchema = z.array(ClientesSchema);
