export function formatPay(amount: string) {
  const cleaned = amount.replace(/[^\d]/g, '');

  if (!cleaned) return '';

  const n = Number(cleaned);
  return `₦${n.toLocaleString('en-NG')}`;
}
