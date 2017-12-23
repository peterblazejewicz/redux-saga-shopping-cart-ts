import ItemsRepo from '../db/ItemsRepo';
import { DbContext } from './../db/db-context';
import { Request, Response } from 'express';

/**
 * @export
 * @class ItemsController
 */
export default class ItemsController {
  private itemsRepo: ItemsRepo;

  constructor(dbContext: DbContext) {
    this.itemsRepo = new ItemsRepo(dbContext);
  }

  /**
   * Return list of items using ids
   * @memberof ItemsController
   */
  public getItemsByIds = (req: Request, res: Response) => {
    const ids: string[] = req.params.ids.split(',');
    const items = ids.map(id => this.itemsRepo.findItemById(id));
    if (items.includes(undefined)) {
      res.status(500).json({ error: 'A specified ID had no matching item' });
    } else {
      res.status(200).json(items);
    }
  };

  /**
   * Get list of items prices
   *
   * @memberof ItemsController
   */
  public getPriceForItems = (req: Request, res: Response) => {
    const ids: string[] = req.params.ids.split(',');
    const items = ids.map(id => this.itemsRepo.findItemById(id));
    const supportedSymbols = ['CAD', 'USD'];
    const symbol: string = req.params.symbol;
    if (!supportedSymbols.includes(symbol)) {
      return res.status(403).json({
        error:
          'The currency symbol provided is inaccurate, see list of supported currencies',
        supportedSymbols
      });
    }
    if (items.includes(undefined)) {
      return res
        .status(500)
        .json({ error: 'A specified ID had no matching item' });
    } else {
      return res.status(200).json(
        items.map(item => ({
          id: item!.id,
          symbol,
          price: symbol === 'USD' ? item!.usd : item!.cad
        }))
      );
    }
  };

  /**
   * Get shipping cost of given items
   * @memberof ItemsController
   */
  public getShippingRatesForItems = (req: Request, res: Response) => {
    const ids: string[] = req.params.items.split(',');
    let total = 0;
    ids.forEach(id => {
      const item = this.itemsRepo.findItemById(id);
      if (item) {
        if (item.weight === 0) {
          total += 0;
        } else if (item.weight < 0.5) {
          total += 3.5;
        } else {
          total += 8.5;
        }
      }
    });
    res.status(200).json({
      total
    });
  };
}
