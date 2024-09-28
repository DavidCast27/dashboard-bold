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
import {format} from "date-fns";
import {currencyFormatter} from "../../../../utils/currency.formatter.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}
const DetailDrawer = ({isOpen, onClose, transaction}: Props) => {

  const {createdAt, amount, deduction, status, id, paymentMethod, salesType} = transaction
  const createdAtFormatted = format(new Date(createdAt), 'dd/MM/yyyy - HH:mm:ss')
  const amountFormatted = currencyFormatter(amount)
  const deductionFormatted = currencyFormatter((deduction ?? 0)*-1)

  const hasDeduction = status === TransactionStatus.SUCCESSFUL && Boolean(deduction)

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={20}>
        <DrawerCloseButton />
        <DrawerHeader mb={20} mt={12}>
          <Flex alignItems="center" justifyContent="center" direction="column" gap={2}>
            <Image src="/path/to/your/check-icon.svg" alt="Checkmark" />
            <Heading as="h2" size="md" ml={2}>
              ¡Cobro exitoso!
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
            <Text fontWeight="bold">{paymentMethod}</Text>
          </Flex>

          <Flex justifyContent="space-between">
            <Text textColor="bold-dark-gray">Tipo de pago:</Text>
            <Text fontWeight="bold">{salesType}</Text>
          </Flex>
        </DrawerBody>


      </DrawerContent>
    </Drawer>
  );
};

export default DetailDrawer;