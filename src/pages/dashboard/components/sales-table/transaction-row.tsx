import {Show, Td, Text, Tr, useDisclosure} from "@chakra-ui/react";
import {format} from "date-fns";
import {Transaction, TransactionStatus} from "../../../../types/types.ts";
import {transactionStatusLabelMapper} from "../../../../utils/label-mappers.constants.ts";
import {currencyFormatter} from "../../../../utils/currency.formatter.ts";
import DetailDrawer from "../detail-drawer/detail-drawer.tsx";

type Props = {
  transaction: Transaction;
}
const TransactionRow = ({transaction}:Props) => {
  const {isOpen, onOpen, onClose}  = useDisclosure()

  const { status, id, paymentMethod, createdAt, amount, deduction} = transaction
  const createdAtFormatted = format(new Date(createdAt), 'dd/MM/yyyy - HH:mm:ss')
  const amountFormatted = currencyFormatter(amount)
  const deductionFormatted = currencyFormatter((deduction ?? 0)*-1)

  const hasDeduction = status === TransactionStatus.SUCCESSFUL && Boolean(deduction)

  return (
    <>
      <Tr onClick={onOpen}>
        <Td py={hasDeduction ? 1 : 4} textColor="bold-blue">{transactionStatusLabelMapper[status]}</Td>
        <Show above='md'>
          <Td py={hasDeduction ? 1 : 4}>{createdAtFormatted}</Td>
        </Show>
        <Td py={hasDeduction ? 1 : 4}>{paymentMethod}</Td>
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