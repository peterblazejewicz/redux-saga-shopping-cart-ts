import { User } from './../models/User';
import { DbContext } from './db-context';
/**
 * @export
 * @class UsersRepo
 */
export default class UsersRepo {
  constructor(private db: DbContext) {}

  public findById(id: string): User | undefined {
    return this.db.users.find(user => user.id === id);
  }
}
