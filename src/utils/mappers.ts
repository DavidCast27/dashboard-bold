import {DateType, Franchise, PaymentMethods, SalesType, TransactionStatus} from "../types/types.ts";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import pseImg from "../assets/img/payment-methods/pse.svg"
import bancolombiaImg from "../assets/img/payment-methods/bancolombia.svg"
import nequiImg from "../assets/img/payment-methods/nequi.svg"
import daviplataImg from "../assets/img/payment-methods/daviplata.svg"
import amexImg from "../assets/img/franchises/american-express.svg"
import visaImg from "../assets/img/franchises/visa.svg"
import mastercardImg from "../assets/img/franchises/mastercard.svg"
import paymentLinkImg from "../assets/img/sales-type/payment-link.svg"
import terminalImg from "../assets/img/sales-type/terminal.svg"


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

export const paymentMethodMapper = {
  [PaymentMethods.PSE]: {
    label: 'PSE',
    image: pseImg
  },
  [PaymentMethods.BANCOLOMBIA]: {
    label: 'Bancolombia',
    image: bancolombiaImg
  },
  [PaymentMethods.NEQUI]: {
    label: 'Nequi',
    image: nequiImg
  },
  [PaymentMethods.DAVIPLATA]: {
    label: 'Daviplata',
    image: daviplataImg
  },
  [PaymentMethods.CARD]: {
    label: 'Tarjeta',
    image: ''
  }
}

export const franchiseMapper = {
  [Franchise.AMEX]: amexImg,
  [Franchise.VISA]: visaImg,
  [Franchise.MASTERCARD]: mastercardImg,
}

export const saleTypesMapper = {
  [SalesType.PAYMENT_LINK]: {
    label: 'Link de pagos',
    image: paymentLinkImg,
  },
  [SalesType.TERMINAL]: {
    label: 'Datafono',
    image: terminalImg,
  }
}


