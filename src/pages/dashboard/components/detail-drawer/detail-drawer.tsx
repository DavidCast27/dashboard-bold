import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import {Transaction, TransactionStatus} from "../../../../types/types.ts";
import {
  transactionStatusLabelMapper
} from "../../../../utils/mappers.ts";
import {CheckCircleIcon, WarningIcon} from "@chakra-ui/icons";
import {useTransactionDetail} from "../../hooks/use-transaction-detail.tsx";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}
const DetailDrawer = ({isOpen, onClose, transaction}: Props) => {
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
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={{base: 0, md: 20}}>
        <DrawerCloseButton />
        <DrawerHeader mb={20} mt={12}>
          <Flex alignItems="center" justifyContent="center" direction="column" gap={2}>
            {TransactionStatus.SUCCESSFUL == status && <CheckCircleIcon boxSize={8} color="green.300"/>}
            {TransactionStatus.REJECTED == status && <WarningIcon boxSize={8} color="red.400"/>}
            <Heading as="h2" size="md" ml={2}>
              {transactionStatusLabelMapper[status]}
            </Heading>
            <Heading as="h1" size="lg" ml={2} textColor="bold-blue">
              {amountFormatted}
            </Heading>
            <Text textColor="bold-dark-gray" fontSize="sm">{createdAtFormatted}</Text>
          </Flex>
        </DrawerHeader>

        <DrawerBody as={Flex} direction="column" gap={4}>
          <Flex justifyContent="space-between">
            <Text textColor="bold-dark-gray">ID transacción Bold:</Text>
            <Text fontWeight="bold">{id}</Text>
          </Flex>

          {hasDeduction && (
            <Flex justifyContent="space-between">
              <Text textColor="bold-dark-gray">Deducción Bold:</Text>
              <Text fontWeight="bold" textColor="bold-red">{deductionFormatted}</Text>
            </Flex>
          )}

          <Divider borderWidth="1px" borderColor="black" />

          <Flex justifyContent="space-between">
            <Text textColor="bold-dark-gray">Método de pago:</Text>
            <Flex gap={4} alignItems="center" justifyContent="flex-start">
              <Image boxSize={8} src={paymentMethodImage} alt={paymentMethodLbl} />
                {paymentMethodLbl}
            </Flex>
          </Flex>

          <Flex justifyContent="space-between">
            <Text textColor="bold-dark-gray">Tipo de pago:</Text>
            <Flex gap={4} alignItems="center" justifyContent="flex-start">
              <Image boxSize={6} src={typeImage} alt={typeLabel} />
              <Text fontWeight="bold">{typeLabel}</Text>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailDrawer;