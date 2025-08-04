import { ItemEmprestimo } from "./item-emprestimo";

export class Emprestimo {
  public id_emprestimo!: number;
  public cd_emprestimo: string = '';
  public ds_observacao: string = '';
  public dt_emprestimo: string = '';
  public id_centrocusto!: number;
  public tp_status: string = '';
  public tp_emprestimo: string = '';
  public vl_total!: number;

  public itens!: ItemEmprestimo[];
}
