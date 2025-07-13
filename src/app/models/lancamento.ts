import { ItemLancamento } from "./item-lancamento";

export class Lancamento {
  public id_lancamento!: number;
  public cd_lancamento!: string;
  public ds_lancamento!: string;
  public dt_anomes!: string;
  public dt_lancamento!: string;
  public id_centrocusto!: number;
  public vl_total!: number;

  public itens!: ItemLancamento[];
}
