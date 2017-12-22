import { Card } from './../models/Card';
import { DbContext } from './db-context';
/**
 * @export
 * @class CardsRepo
 */
export default class CardsRepo {
  constructor(private db: DbContext) {}

  /**
   * Find Card by card's owner
   * @param {string} owner
   * @returns {(Card | undefined)}
   * @memberof CardsRepo
   */
  public findByCardOwner(owner: string): Card | undefined {
    return this.db.cards.find(card => card.owner === owner);
  }
}
