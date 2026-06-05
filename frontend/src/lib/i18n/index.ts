import { vi } from './vi';

export {
  formatVND,
  formatPriceRange,
  formatDate,
  formatDateTime,
  formatNumber,
  formatVoucherValue,
} from './format';
export { vi };

/** Simple typed accessor — vi only for now (Vietnam market) */
export function t<K extends keyof typeof vi>(section: K): (typeof vi)[K] {
  return vi[section];
}
