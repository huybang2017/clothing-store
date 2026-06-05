export enum PaymentMethod {
  COD = 'COD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.COD]: 'Thanh toán khi nhận hàng',
  [PaymentMethod.BANK_TRANSFER]: 'Chuyển khoản ngân hàng',
  [PaymentMethod.VNPAY]: 'VNPay',
  [PaymentMethod.MOMO]: 'MoMo',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'Chờ thanh toán',
  [PaymentStatus.PROCESSING]: 'Đang xử lý',
  [PaymentStatus.PAID]: 'Đã thanh toán',
  [PaymentStatus.FAILED]: 'Thanh toán thất bại',
  [PaymentStatus.CANCELLED]: 'Đã hủy',
  [PaymentStatus.REFUNDED]: 'Đã hoàn tiền',
};
