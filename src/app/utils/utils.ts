export function formatDate(input: string | Date): string {
  if (!input) return '';

  let year: string, month: string, day: string;

  if (input instanceof Date) {
    year = String(input.getFullYear());
    month = String(input.getMonth() + 1).padStart(2, '0');
    day = String(input.getDate()).padStart(2, '0');
  } else {
    const match = input.match(/(\d{4})[-\/](\d{2})[-\/](\d{2})/);
    if (!match) return input;
    [ , year, month, day ] = match;
  }

  return `${day}/${month}/${year}`;
}


export function getDateOnly(dateStr: string): string {
  return dateStr.split('T')[0].split(' ')[0];
}