import {Card, CardBody, CardHeader, Stack, Text} from "@chakra-ui/react";
import {useFiltersStore} from "../../../../stores/use-filters.store.ts";
import {dateFilterFormatMapper, dateFilterLabelMapper} from "../../../../utils/mappers.ts";
import {currencyFormatter} from "../../../../utils/currency.formatter.ts";
import TotalSalesTooltip from "./total-sales-tooltip.tsx";

type Props = {
  totalSales: number
}
const TotalSaleCard = ({ totalSales }: Props) => {

  const date = useFiltersStore((state)=> state.date)
  const label = dateFilterLabelMapper[date].toLowerCase()

  const totalSalesFormatted = currencyFormatter(totalSales)
  const dateFormatted = dateFilterFormatMapper[date]

  return (
    <Card as="article" rounded="xl" >
      <CardHeader
        bgGradient="linear(to-r, bold-blue, bold-red)"
        textColor="white"
        justifyContent="space-between"
        display="flex"
        gap={6}
        roundedTop="xl"
        alignItems="center"
        py={3}
      >
        <Text >Total de ventas de {label}</Text>
        <TotalSalesTooltip />
      </CardHeader>
      <CardBody as={Stack} textAlign="center" pb={2} gap={2}>
        <Text
          fontWeight="bold"
          bgGradient="linear(to-r, bold-blue, bold-red)"
          bgClip="text"
          textColor="transparent"
          display="inline-block"
          fontSize="2xl"
        >
          {totalSalesFormatted}
        </Text>
        <Text textColor="bold-dark-gray">{dateFormatted}</Text>
      </CardBody>
    </Card>
  );
}

export default TotalSaleCard;
