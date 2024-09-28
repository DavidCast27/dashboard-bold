import {Card, CardHeader, Show, Table, Tbody, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {useFiltersStore} from "../../../../stores/use-filters.store.ts";
import {dateFilterLabelMapper} from "../../../../utils/label-mappers.constants.ts";
import {Transaction} from "../../../../types/types.ts";
import TransactionRow from "./transaction-row.tsx";

type Props = {
  transactions: Transaction[]
}
const SalesTable = ({transactions}: Props) => {
  const date = useFiltersStore((state)=> state.date)
  const label = dateFilterLabelMapper[date].toLowerCase()

  return (
    <Card as="section">
      <CardHeader bgGradient="linear(to-r, bold-blue, bold-red)" textColor="white" justifyContent="space-between" display="flex" gap={6} roundedTop="xl">
        <Text>Tus ventas de {label}</Text>
      </CardHeader>
      <>
        <Table size={{base:"sm", md: "md"}} variant="striped">
          <Thead>
            <Tr>
              <Th>Transacción</Th>
              <Show above='md'>
                <Th>Fecha y hora</Th>
              </Show>
              <Th>Método de pago</Th>
              <Show above='md'>
                <Th>ID transacción Bold</Th>
              </Show>
              <Th>Monto</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction)=>(
              <TransactionRow transaction={transaction} key={transaction.id} />
            ))}
          </Tbody>
        </Table>
      </>

    </Card>
  );
};

export default SalesTable;