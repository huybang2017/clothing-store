const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const numberFormatter = new Intl.NumberFormat('vi-VN');

/** Format amount as Vietnamese Đồng (e.g. 299.000 ₫) */
export function formatVND(amount: number): string {
  const value = Number(amount);
  if (!Number.isFinite(value)) return vndFormatter.format(0);
  return vndFormatter.format(Math.round(value));
}

/** Price range for products with variants (e.g. 250.000 ₫ - 350.000 ₫) */
export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatVND(min);
  return `${formatVND(min)} - ${formatVND(max)}`;
}

/** DD/MM/YYYY */
export function formatDate(value: string | Date): string {
  return dateFormatter.format(new Date(value));
}

/** DD/MM/YYYY HH:mm (24h) */
export function formatDateTime(value: string | Date): string {
  return dateTimeFormatter.format(new Date(value));
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** Voucher display: percentage or fixed VND */
export function formatVoucherValue(type: 'percentage' | 'fixed', value: number): string {
  return type === 'percentage' ? `${value}%` : formatVND(value);
}
