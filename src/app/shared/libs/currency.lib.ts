export function toCurrencyString(amount: number | string): string {
  return `$${(+amount).toFixed(2)}`;
}