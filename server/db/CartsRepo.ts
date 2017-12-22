import { Cart } from './../models/Cart';
import { DbContext } from './db-context';
/**
 * @export
 * @class CartsRepo
 */
export default class CartsRepo {
  constructor(private db: DbContext) {}

  /**
   * Finds shopping cart by its owner id
   * @param {string} owner
   * @returns {(Cart | undefined)}
   * @memberof CartsRepo
   */
  public findByCartOwner(owner: string): Cart | undefined {
    return this.db.carts.find(cart => cart.owner === owner);
  }
}
