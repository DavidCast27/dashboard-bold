import { describe, expect, it } from 'vitest'

import {currencyFormatter} from "../currency.formatter.ts";

describe('currencyFormatter', () => {

  it('should format integer values correctly in Colombian pesos', () => {
    const value = 1000;
    const formattedValue = currencyFormatter(value);
    expect(formattedValue).toBe('$ 1.000');
  });

  it('should handle very small decimal values', () => {
    const value = 0.0001;
    const formattedValue = currencyFormatter(value);
    expect(formattedValue).toBe('$ 0');
  });
});
