export function formatAnoMes(anoMes: number | string): string {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const anoMesStr = anoMes.toString();

  if (anoMesStr.length !== 6) return 'Formato inválido';

  const ano = anoMesStr.substring(0, 4);
  const mesIndex = parseInt(anoMesStr.substring(4, 6), 10) - 1;

  const nomeMes = meses[mesIndex] ?? 'Mês inválido';

  return `${nomeMes}`;
//   return `${nomeMes} de ${ano}`;
}
