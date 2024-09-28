import TotalSaleCard from "./components/total-sales-card/total-sales-card.tsx";
import DateFilterButtonGroup from "./components/date-filter-button-group/date-filter-button-group.tsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import SalesTable from "./components/sales-table/sales-table.tsx";
import {useFilteredData} from "./hooks/use-filtered-data.tsx";
import SaleTypeFilterMenu from "./components/sale-type-filter-menu/sale-type-filter-menu.tsx";

const Dashboard = () => {

  const { data, isLoading, isError, totalSales } = useFilteredData();

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
  <Box as="main" m={{base:4, md:12}} display="flex" flexDirection="column" gap={4}>
    <Grid
      gap={4}
      templateAreas={{
        base: `"totalSale"
                "dateFilter"
                "typeFilter"`,
        md:`"totalSale dateFilter"
            "totalSale  typeFilter"`,
      }}
      gridTemplateRows={{base: '2fr 60px 60px', md: '40px  1fr'}}
      gridTemplateColumns={{base: '1fr', md: '2fr 3fr'}}
    >
      <GridItem area={'totalSale'} justifyContent="end">
        <TotalSaleCard totalSales={totalSales}/>
      </GridItem>
      <GridItem area={'dateFilter'}>
        <DateFilterButtonGroup />
      </GridItem>
      <GridItem area={'typeFilter'} justifySelf="end" w={{base:"100%", md:"auto"}}>
        <SaleTypeFilterMenu />
      </GridItem>
    </Grid>
    <SalesTable transactions={data}/>
    {/*<SalesTable2 transactions={data} />*/}
  </Box>
  );
};

export default Dashboard;