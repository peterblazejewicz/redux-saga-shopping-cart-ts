import ItemsRepo from '../db/ItemsRepo';
import UsersRepo from '../db/UsersRepo';
import { DbContext } from './../db/db-context';
import { Response } from 'express';
import { ShoppingCartRequest } from './../models/ShoppingCardRequest';

/**
 *
 *
 * @export
 * @class CardsController
 */
export default class CardsController {
  private usersRepo: UsersRepo;
  private itemsRepo: ItemsRepo;
  constructor(dbContext: DbContext) {
    this.usersRepo = new UsersRepo(dbContext);
    this.itemsRepo = new ItemsRepo(dbContext);
  }

  /**
   *
   *
   * @memberof CardsController
   */
  public chargeOwner = (req: ShoppingCartRequest, res: Response) => {
    const { card, cart } = req;
    const { owner } = req.params;
    const country = this.usersRepo.getUserCountryByUserId(owner);
    const total = cart.items.reduce((total, { quantity, id }) => {
      const item = this.itemsRepo.findItemById(id);
      if (!item) return total;
      const symbol = country === 'CAD' ? 'cad' : 'usd';
      const baseValue: number = item[symbol] || 0;
      total += baseValue * quantity;
      return total;
    }, 0);

    if (card.availableFunds <= total) {
      res.status(402).json({ success: false });
    } else {
      card.availableFunds -= total;
      res.status(201).send({ success: true });
    }
  };
}
