import TaxesRepo from '../db/TaxesRepo';
import { DbContext } from './../db/db-context';
import { Request, Response } from 'express';

export default class TaxesController {
  private dbRepo: TaxesRepo;
  constructor(dbContext: DbContext) {
    this.dbRepo = new TaxesRepo(dbContext);
  }

  /**
   * @memberof TaxesController
   */
  public findBySymbol = (req: Request, res: Response) => {
    const { symbol } = req.params;
    const taxRate = this.dbRepo.findBySymbol(symbol);
    if (!taxRate) {
      res.status(500).json({
        symbol,
        error: 'No tax rate info for symbol ' + symbol
      });
    } else {
      res.status(200).json({
        rate: taxRate.rate
      });
    }
  };
}
