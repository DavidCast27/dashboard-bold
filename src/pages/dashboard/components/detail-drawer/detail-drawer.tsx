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
import {PaymentMethods, Transaction, TransactionStatus} from "../../../../types/types.ts";
import {format} from "date-fns";
import {currencyFormatter} from "../../../../utils/currency.formatter.ts";
import {paymentMethodMapper, saleTypesMapper} from "../../../../utils/label-mappers.constants.ts";
import {CheckCircleIcon, WarningIcon} from "@chakra-ui/icons";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}
const DetailDrawer = ({isOpen, onClose, transaction}: Props) => {

  const {createdAt, amount, deduction, status, id, paymentMethod, salesType, franchise, transactionReference} = transaction
  const createdAtFormatted = format(new Date(createdAt), 'dd/MM/yyyy - HH:mm:ss')
  const amountFormatted = currencyFormatter(amount)
  const deductionFormatted = currencyFormatter((deduction ?? 0)*-1)

  const hasDeduction = status === TransactionStatus.SUCCESSFUL && Boolean(deduction)

  const {image: paymentMethodImages, label: paymentMethodLabel} = paymentMethodMapper[paymentMethod]
  const {image: typeImage, label: typeLabel} = saleTypesMapper[salesType]

  const paymentMethodImage =  PaymentMethods.CARD === paymentMethod && franchise
    ? paymentMethodImages[franchise]
    : paymentMethodImages

  const paymentMethodLbl = PaymentMethods.PSE === paymentMethod
    ? paymentMethodLabel
    : `****${transactionReference}`


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
            <Flex gap={4} alignItems="center" justifyContent="flex-start">
              <Image boxSize={8} src={paymentMethodImage} alt={paymentMethodLabel} />
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