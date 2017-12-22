import { TaxRate } from './../models/TaxRate';
import { DbContext } from './db-context';
/**
 * @export
 * @class TaxesRepo
 */
export default class TaxesRepo {
  constructor(private db: DbContext) {}

  /**
   * @param {string} symbol
   * @returns {(TaxRate | undefined)}
   * @memberof TaxesRepo
   */
  public findBySymbol(symbol: string): TaxRate | undefined {
    return this.db.taxRates.find(rate => rate.symbol === symbol);
  }
}
