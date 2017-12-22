import * as YAML from 'yamljs';
import { Card } from './../models/Card';
import { Cart } from './../models/Cart';
import { DbContext } from './db-context';
import { Item } from './../models/Item';
import { TaxRate } from './../models/TaxRate';
import { User } from './../models/User';

export interface DbContext {
  readonly connected: boolean;
  readonly users: User[];
  readonly cards: Card[];
  readonly carts: Cart[];
  readonly taxRates: TaxRate[];
  readonly items: Item[];
}

let yaml: DbContext;

export default class YamlDbContext implements DbContext {
  get connected() {
    return yaml !== null;
  }
  get cards(): Card[] {
    return yaml.cards;
  }
  get carts(): Cart[] {
    return yaml.carts;
  }
  get items(): Item[] {
    return yaml.items;
  }
  get taxRates(): TaxRate[] {
    return yaml.taxRates;
  }
  get users(): User[] {
    return yaml.users;
  }

  public static connect(path: string): Promise<DbContext> {
    return new Promise<DbContext>((resolve, reject) => {
      try {
        YAML.load(path, (database: DbContext) => {
          yaml = database;
          resolve(new YamlDbContext());
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public static create(): DbContext {
    return new YamlDbContext();
  }
}
