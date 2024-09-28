import {Flex, Image, Show, Td, Text, Tr, useDisclosure} from "@chakra-ui/react";
import {format} from "date-fns";
import {PaymentMethods, Transaction, TransactionStatus} from "../../../../types/types.ts";
import {
  paymentMethodMapper,
  saleTypesMapper,
  transactionStatusLabelMapper
} from "../../../../utils/label-mappers.constants.ts";
import {currencyFormatter} from "../../../../utils/currency.formatter.ts";
import DetailDrawer from "../detail-drawer/detail-drawer.tsx";
type Props = {
  transaction: Transaction;
}
const TransactionRow = ({transaction}:Props) => {
  const {isOpen, onOpen, onClose}  = useDisclosure()

  const { status, id, paymentMethod, createdAt, amount, deduction, franchise, transactionReference, salesType} = transaction
  const createdAtFormatted = format(new Date(createdAt), 'dd/MM/yyyy - HH:mm:ss')
  const amountFormatted = currencyFormatter(amount)
  const deductionFormatted = currencyFormatter((deduction ?? 0)*-1)

  const hasDeduction = status === TransactionStatus.SUCCESSFUL && Boolean(deduction)
  const {image: paymentMethodImages, label: paymentMethodLabel} = paymentMethodMapper[paymentMethod]
  const {image: typeImage, label: typeLabel} = saleTypesMapper[salesType]

  const paymentMethodImage: string =  PaymentMethods.CARD === paymentMethod && franchise
    ?paymentMethodImages[franchise]
    : paymentMethodImages

  const paymentMethodLbl = PaymentMethods.PSE === paymentMethod
    ? paymentMethodLabel
    : `****${transactionReference}`

  return (
    <>
      <Tr onClick={onOpen}>
        <Td py={hasDeduction ? 1 : 4} textColor="bold-blue">
          <Flex gap={2} alignItems="center" justifyContent="flex-start">
            <Show above="md">
              <Image boxSize={6} src={typeImage} alt={typeLabel} />
            </Show>
            {transactionStatusLabelMapper[status]}
          </Flex>
        </Td>
        <Show above='md'>
          <Td py={hasDeduction ? 1 : 4}>{createdAtFormatted}</Td>
        </Show>
        <Td py={hasDeduction ? 1 : 4}>
          <Flex gap={4} alignItems="center" justifyContent={{base: "center", md: "flex-start"}}>
            <Image boxSize={8} src={paymentMethodImage} alt={paymentMethodLabel} />
            <Show above='md'>
              {paymentMethodLbl}
            </Show>
          </Flex>
        </Td>
        <Show above='md'>
          <Td py={hasDeduction ? 1 : 4}>{id}</Td>
        </Show>
        <Td py={hasDeduction ? 1 : 4} textColor="bold-blue" >
          {amountFormatted}
          {hasDeduction &&  (
            <>
              <Text textColor="bold-dark-gray" fontSize="xs">deducción de bold</Text>
              <Text textColor="bold-red" fontSize="xs">{deductionFormatted}</Text>
            </>
          )}
        </Td>
      </Tr>
      <DetailDrawer isOpen={isOpen} onClose={onClose} transaction={transaction} />
    </>
  );
};

export default TransactionRow;