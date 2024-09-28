import {Transaction} from "../../../../types/types.ts";
import {Card, CardHeader, Text} from "@chakra-ui/react";
import {DataTable} from "../../../../components/data-table/data-table.tsx";
import {columns} from "./table.definitions.tsx";
import {useFiltersStore} from "../../../../stores/use-filters.store.ts";
import {dateFilterLabelMapper} from "../../../../utils/label-mappers.constants.ts";

type Props = {
  transactions: Transaction[]
}
const SalesTable2 = ({transactions}: Props) => {
  const date = useFiltersStore((state)=> state.date)
  const label = dateFilterLabelMapper[date].toLowerCase()
  return (
    <Card as="section">
      <CardHeader bgGradient="linear(to-r, bold-blue, bold-red)" textColor="white" justifyContent="space-between" display="flex" gap={6} roundedTop="xl">
        <Text>Tus ventas de {label}</Text>
      </CardHeader>
      <>
        <DataTable columns={columns} data={transactions} />
      </>
    </Card>

)

};

export default SalesTable2;