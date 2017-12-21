import { Card } from './Card';
import { Cart } from './Cart';
import { Item } from './Item';
import { TaxRate } from './TaxRate';
import { User } from './User';
export interface Database {
  cards: Array<Card>;
  carts: Array<Cart>;
  items: Array<Item>;
  taxRates: Array<TaxRate>;
  users: Array<User>;
}
