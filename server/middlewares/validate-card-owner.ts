import { DbContext } from './../db/db-context';
import { Response, NextFunction } from 'express';
import { ShoppingCartRequest } from './../models/ShoppingCardRequest';
import CardsRepo from '../db/CardsRepo';

/**
 *
 *
 * @param {DbContext} dbContext
 * @returns
 */
const validateCardOwner = (dbContext: DbContext) => {
  const dbRepo: CardsRepo = new CardsRepo(dbContext);
  return (req: ShoppingCartRequest, res: Response, next: NextFunction) => {
    const { owner } = req.params;
    const card = dbRepo.findByCardOwner(owner);
    if (!card) {
      res.status(500).send({ error: `No card is available for user ${owner}` });
    } else {
      req.card = card;
      next();
    }
  };
};

export default validateCardOwner;
