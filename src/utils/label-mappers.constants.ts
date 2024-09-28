import {DateType, TransactionStatus} from "../types/types.ts";
import {format} from "date-fns";
import {es} from "date-fns/locale";

export const dateFilterLabelMapper = {
  [DateType.DAY]: 'hoy',
  [DateType.WEEK]: 'esta semana',
  [DateType.MONTH]: format(new Date(), "MMMM", {locale: es})
}

export const dateFilterFormatMapper = {
  [DateType.DAY]: format(new Date(), "dd 'de' MMMM yyyy", {locale: es}) ,
  [DateType.WEEK]: format(new Date(), "MMMM',' yyyy", {locale: es}) ,
  [DateType.MONTH]: format(new Date(), "MMMM',' yyyy", {locale: es}) ,
}

export const transactionStatusLabelMapper = {
  [TransactionStatus.REJECTED]: 'Cobro no realizado',
  [TransactionStatus.SUCCESSFUL]: 'Cobro exitoso'
}


