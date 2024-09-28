import {format} from "date-fns";
import {currencyFormatter} from "../../../utils/currency.formatter.ts";
import {PaymentMethods, Transaction, TransactionStatus} from "../../../types/types.ts";
import {franchiseMapper, paymentMethodMapper, saleTypesMapper} from "../../../utils/label-mappers.constants.ts";

type Props = {
  transaction: Transaction;
}
export const useTransactionDetail = ({transaction}:Props) => {
  const { status, paymentMethod, createdAt, amount, deduction, franchise, transactionReference, salesType} = transaction
  const createdAtFormatted = format(new Date(createdAt), 'dd/MM/yyyy - HH:mm:ss')
  const amountFormatted = currencyFormatter(amount)
  const deductionFormatted = currencyFormatter((deduction ?? 0)*-1)

  const hasDeduction = status === TransactionStatus.SUCCESSFUL && Boolean(deduction)
  const {image: paymentMethodImages, label: paymentMethodLabel} = paymentMethodMapper[paymentMethod]
  const {image: typeImage, label: typeLabel} = saleTypesMapper[salesType]

  const paymentMethodImage: string =  PaymentMethods.CARD === paymentMethod && franchise
    ? franchiseMapper[franchise]
    : paymentMethodImages

  const paymentMethodLbl = PaymentMethods.PSE === paymentMethod
    ? paymentMethodLabel
    : `****${transactionReference}`

  return {
    createdAtFormatted,
    amountFormatted,
    deductionFormatted,
    paymentMethodImage,
    paymentMethodLbl,
    typeImage,
    typeLabel,
    hasDeduction
  }
}