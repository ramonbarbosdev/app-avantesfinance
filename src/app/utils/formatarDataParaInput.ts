export const formatarDataParaInput = (
  data: Date | string | number[] | null | undefined
): string => {
  if (!data) return '';

  let dateObj: Date;

  if (Array.isArray(data) && data.length === 5) {
    dateObj = new Date(data[0], data[1] - 1, data[2]);
  } else if (typeof data === 'string' || data instanceof Date) {
    dateObj = new Date(data);
  } else {
    console.error('Formato de data não suportado:', data);
    return '';
  }

  if (isNaN(dateObj.getTime())) {
    console.error('Data inválida após tentativa de conversão:', data);
    return '';
  }

  const ano = dateObj.getFullYear();
  const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const dia = dateObj.getDate().toString().padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};
