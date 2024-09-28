import {describe, expect, it} from 'vitest'
import {
  filterByDay,
  filterByMonth,
  filterByWeek,
  filterTransactionsByDate, filterTransactionsBySearch,
  filterTransactionsByTypes
} from "../filters.helpers.ts";
import {DateType, PaymentMethods, SalesType, Transaction, TransactionStatus} from "../../types/types.ts";

describe('filterByDay', () => {

  it('should return transactions created today', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: Date.now(), transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: Date.now() - 86400000, transactionReference: 124, amount: 200 }
    ];
    const result = filterByDay(transactions);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

});


describe('filterByWeek', () => {

  it('should filter transactions that occurred within the current week', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: Date.now(), transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.REJECTED, paymentMethod: PaymentMethods.PSE, salesType: SalesType.PAYMENT_LINK, createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, transactionReference: 456, amount: 200 }
    ];
    const result = filterByWeek(transactions);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
  });

  it('should return an empty array when no transactions are provided', () => {
    const transactions: Transaction[] = [];
    const result = filterByWeek(transactions);
    expect(result.length).toBe(0);
  });
});

describe('filterByMonth', () => {

  it('should filter transactions correctly when all transactions are from the current month', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: Date.now(), transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: Date.now(), transactionReference: 456, amount: 200 }
    ];
    const result = filterByMonth(transactions);
    expect(result).toHaveLength(2);
    expect(result).toEqual(transactions);
  });

  it('should handle an empty transactions array without errors', () => {
    const transactions: Transaction[] = [];
    const result = filterByMonth(transactions);
    expect(result).toHaveLength(0);
  });
});

describe('filterTransactionsByDate', () => {

  it('should filter transactions correctly by day', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: new Date().getTime(), transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: new Date().getTime() - 86400000, transactionReference: 124, amount: 200 }
    ];
    const result = filterTransactionsByDate(transactions, DateType.DAY);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should handle an empty transactions array without errors', () => {
    const transactions: Transaction[]  = [];
    const result = filterTransactionsByDate(transactions, DateType.DAY);
    expect(result).toHaveLength(0);
  });

  it('should filter transactions correctly by week', () => {
    const transactions: Transaction[]  = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: new Date().getTime(), transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: new Date().getTime() - 604800000, transactionReference: 124, amount: 200 }
    ];
    const result = filterTransactionsByDate(transactions, DateType.WEEK);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter transactions correctly by month', () => {
    const transactions: Transaction[]  = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: new Date().getTime(), transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.PAYMENT_LINK, createdAt: new Date().getTime() - 86400000, transactionReference: 124, amount: 200 }
    ];
    const result = filterTransactionsByDate(transactions, DateType.MONTH);
    expect(result).toHaveLength(2);
  });
});

describe('filterTransactionsByTypes', () => {

  it('should filter transactions correctly when salesTypes array has matching types', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: 1620000000000, transactionReference: 123, amount: 100 },
      { id: '2', status: TransactionStatus.REJECTED, paymentMethod: PaymentMethods.PSE, salesType: SalesType.PAYMENT_LINK, createdAt: 1620000000001, transactionReference: 124, amount: 200 },
      { id: '3', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.NEQUI, salesType: SalesType.TERMINAL, createdAt: 1620000000002, transactionReference: 125, amount: 300 }
    ];
    const salesTypes = [SalesType.TERMINAL];
    const result = filterTransactionsByTypes(transactions, salesTypes);
    expect(result).toEqual([
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: 1620000000000, transactionReference: 123, amount: 100 },
      { id: '3', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.NEQUI, salesType: SalesType.TERMINAL, createdAt: 1620000000002, transactionReference: 125, amount: 300 }
    ]);
  });
  
});


describe('filterTransactionsBySearch', () => {

  it('should return transactions containing the search term in any field', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: 1627849200000, transactionReference: 12345, amount: 100 },
      { id: '2', status: TransactionStatus.REJECTED, paymentMethod: PaymentMethods.PSE, salesType: SalesType.PAYMENT_LINK, createdAt: 1627849200000, transactionReference: 67890, amount: 200 }
    ];
    const searchTerm = PaymentMethods.CARD;
    const result = filterTransactionsBySearch(transactions, searchTerm);
    expect(result).toEqual([transactions[0]]);
  });
  

  it('should return all transactions when search term is empty', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: 1627849200000, transactionReference: 12345, amount: 100 },
      { id: '2', status: TransactionStatus.REJECTED, paymentMethod: PaymentMethods.PSE, salesType: SalesType.PAYMENT_LINK, createdAt: 1627849200000, transactionReference: 67890, amount: 200 }
    ];
    const searchTerm = '';
    const result = filterTransactionsBySearch(transactions, searchTerm);
    expect(result).toEqual(transactions);
  });

  it('should return transactions containing the search term in any field when search term is in lowercase', () => {
    const transactions: Transaction[] = [
      { id: '1', status: TransactionStatus.SUCCESSFUL, paymentMethod: PaymentMethods.CARD, salesType: SalesType.TERMINAL, createdAt: 1627849200000, transactionReference: 12345, amount: 100 },
      { id: '2', status: TransactionStatus.REJECTED, paymentMethod: PaymentMethods.PSE, salesType: SalesType.PAYMENT_LINK, createdAt: 1627849200000, transactionReference: 67890, amount: 200 }
    ];
    const searchTerm = PaymentMethods.CARD;
    const result = filterTransactionsBySearch(transactions, searchTerm);
    expect(result).toEqual([transactions[0]]);
  });
});





