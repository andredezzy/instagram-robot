export default function parsePrice(value: string): number {
  if (!value) return 0;

  return Number(value.replace(/[^0-9-]+/g, ''));
}
