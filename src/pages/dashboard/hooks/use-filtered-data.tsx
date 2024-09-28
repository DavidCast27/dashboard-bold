import {fetchSales} from "../../../lib/sales.ts";
import {useFiltersStore} from "../../../stores/use-filters.store.ts";
import {useMemo} from "react";
import {
  filterTransactionsByDate,
  filterTransactionsBySearch,
  filterTransactionsByTypes
} from "../../../utils/filters.helpers.ts";
import {TransactionStatus} from "../../../types/types.ts";
import {useSearchStore} from "../../../stores/use-search.store.ts";
import {useQuery} from "@tanstack/react-query";

export const useFilteredData = () => {
  const date = useFiltersStore(state=>state.date)
  const salesTypes = useFiltersStore(state=>state.salesType)
  const search = useSearchStore(state=>state.search)

  const { data, isLoading, isError } = useQuery({ queryKey: ['sales'], queryFn: fetchSales });

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

  const filteredByDateTypeAndSearchData = useMemo(
    () => filterTransactionsBySearch(filteredByDateAndTypeData, search),
    [search, filteredByDateAndTypeData]
  )

  return { data: filteredByDateTypeAndSearchData, isLoading, isError, totalSales }
}