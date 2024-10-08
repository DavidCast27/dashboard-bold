import {DateType, SalesType, Transaction} from "../types/types.ts";
import {isThisMonth, isThisWeek, isToday} from "date-fns";

export function filterByDay(transactions: Transaction[]) {
  return transactions.filter(transaction => {
    const date = new Date(transaction.createdAt);
    return isToday(date)
  })
}

export function filterByWeek(transactions: Transaction[]) {
  return transactions.filter(transaction => {
    const date = new Date(transaction.createdAt);
    return isThisWeek(date)
  });
}

export function filterByMonth(transactions: Transaction[]) {
  return transactions.filter(transaction => {
    const date = new Date(transaction.createdAt);
    return isThisMonth(date)
  });
}

export function filterTransactionsByDate(transactions: Transaction[], dateType: DateType): Transaction[] {
  const filters = {
    [DateType.DAY]: filterByDay,
    [DateType.WEEK]: filterByWeek,
    [DateType.MONTH]: filterByMonth
  };
  const filterFn = filters[dateType];
  return filterFn(transactions);
}

export function filterTransactionsByTypes(transactions: Transaction[], salesTypes: SalesType[]) {
  return transactions.filter((transaction)=> salesTypes.includes(transaction.salesType))
}

export function filterTransactionsBySearch (transactions: Transaction[], searchTerm: string): Transaction[] {
  return transactions.filter(transaction =>
    Object.values(transaction).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
}
