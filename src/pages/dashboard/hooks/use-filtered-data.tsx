import {useQuery} from "react-query";
import {fetchSales} from "../../../lib/sales.ts";
import {useFiltersStore} from "../../../stores/use-filters.store.ts";
import {useMemo} from "react";
import {filterTransactionsByDate, filterTransactionsByTypes} from "../../../utils/filters.helpers.ts";
import {TransactionStatus} from "../../../types/types.ts";

export const useFilteredData = () => {
  const date = useFiltersStore(state=>state.date)
  const salesTypes = useFiltersStore(state=>state.salesType)

  const { data, isLoading, isError } = useQuery('sales', fetchSales);

  const filteredByDateData = useMemo(
    () => filterTransactionsByDate(data?.data ?? [], date),
    [date, data]
  )
  const filteredByDateAndTypeData = useMemo(
    () => filterTransactionsByTypes(filteredByDateData, salesTypes),
    [salesTypes, filteredByDateData]
  )

  const totalSales = useMemo(() => {
    const successfulData = filteredByDateData.filter(({status})=>status === TransactionStatus.SUCCESSFUL)
    return successfulData.reduce((partialSum, acc) => partialSum + acc.amount, 0)
  },[filteredByDateData])

  return { data: filteredByDateAndTypeData, isLoading, isError, totalSales }
}