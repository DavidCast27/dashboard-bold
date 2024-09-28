import {createColumnHelper} from "@tanstack/react-table";
import {Transaction, TransactionStatus} from "../../../../types/types.ts";
import {format} from "date-fns";
import {currencyFormatter} from "../../../../utils/currency.formatter.ts";
import {Text} from "@chakra-ui/react";

const columnHelper = createColumnHelper<Transaction>();

export const columns = [
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "Transacción"
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy - HH:mm:ss'),
    header: "Fecha y hora"
  }),
  columnHelper.accessor("paymentMethod", {
    cell: (info) => info.getValue(),
    header: "Método de pago",
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID transacción Bold",
  }),
  columnHelper.accessor("amount", {
    cell: (info) => {
      const {deduction, status} = info.row.original
      const hasDeduction = Boolean(deduction) && status === TransactionStatus.SUCCESSFUL
      return (
        <>
          {currencyFormatter(info.getValue())}
          {hasDeduction &&  (
            <>
              <Text textColor="bold-dark-gray" fontSize="xs">deducción de bold</Text>
              <Text textColor="bold-red" fontSize="xs">{currencyFormatter(deduction ?? 0)}</Text>
            </>
          )}
        </>
      )
    },
    header: "Monto",
  })
];