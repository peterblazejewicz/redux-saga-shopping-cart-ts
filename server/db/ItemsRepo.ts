import { Item } from './../models/Item';
import { DbContext } from './db-context';

/**
 *
 *
 * @export
 * @class ItemsRepo
 */
export default class ItemsRepo {
  constructor(private db: DbContext) {}

  /**
   *
   *
   * @param {string} id
   * @returns {(Item | undefined)}
   * @memberof ItemsRepo
   */
  public findItemById(id: string): Item | undefined {
    return this.db.items.find(item => item.id === id);
  }
}
