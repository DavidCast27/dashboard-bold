import {Flex, Image, Show, Td, Text, Tr, useDisclosure} from "@chakra-ui/react";
import { Transaction} from "../../../../types/types.ts";
import {transactionStatusLabelMapper} from "../../../../utils/label-mappers.constants.ts";
import DetailDrawer from "../detail-drawer/detail-drawer.tsx";
import {useTransactionDetail} from "../../hooks/use-transaction-detail.tsx";
type Props = {
  transaction: Transaction;
}
const TransactionRow = ({transaction}:Props) => {
  const {isOpen, onOpen, onClose}  = useDisclosure()

  const {
    createdAtFormatted,
    amountFormatted,
    deductionFormatted,
    paymentMethodImage,
    paymentMethodLbl,
    typeImage,
    typeLabel,
    hasDeduction
  } = useTransactionDetail({transaction})

  const {status, id} = transaction

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
            <Image boxSize={8} src={paymentMethodImage} alt={paymentMethodLbl} />
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