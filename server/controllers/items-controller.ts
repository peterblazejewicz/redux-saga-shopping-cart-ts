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
}
