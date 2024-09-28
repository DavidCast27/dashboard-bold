
export const enum DateType {
  DAY = 'day',
  MONTH = 'month',
  WEEK = 'week',
}

export const enum SalesType  {
  TERMINAL = 'TERMINAL',
  PAYMENT_LINK = 'PAYMENT_LINK'
}

export const enum Franchise {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
}

export const enum PaymentMethods {
  DAVIPLATA = 'DAVIPLATA',
  NEQUI = 'NEQUI',
  CARD = 'CARD',
  PSE = 'PSE',
  BANCOLOMBIA = 'BANCOLOMBIA'
}

export const enum TransactionStatus {
  REJECTED = 'REJECTED',
  SUCCESSFUL = 'SUCCESSFUL'
}


export type FilterTypes = {
  date: DateType;
  salesType: SalesType[]
}

export interface Transaction {
  id: string
  status: TransactionStatus
  paymentMethod: PaymentMethods
  salesType: SalesType
  createdAt: number
  transactionReference: number
  amount: number
  deduction?: number
  franchise?: Franchise
}