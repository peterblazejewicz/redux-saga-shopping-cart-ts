import { DbContext } from './../db/db-context';
import { Request, Response } from 'express';
import UsersRepo from '../db/UsersRepo';

export default class UsersController {
  private dbRepo: UsersRepo;
  constructor(dbContext: DbContext) {
    this.dbRepo = new UsersRepo(dbContext);
  }

  findById = (req: Request, res: Response) => {
    const id = req.params.id;
    const user = this.dbRepo.findById(id);
    if (!user) {
      res.status(500).json({
        error: 'No user with the specified ID',
        id
      });
    } else {
      res.status(200).json(user);
    }
  };
}
