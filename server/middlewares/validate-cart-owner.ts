import CartsRepo from './../db/CartsRepo';
import { DbContext } from './../db/db-context';
import { NextFunction, Response } from 'express';
import { ShoppingCartRequest } from './../models/ShoppingCardRequest';

/**
 *
 *
 * @param {DbContext} dbContext
 * @returns
 */
const validateCartOwner = (dbContext: DbContext) => {
  const dbRepo: CartsRepo = new CartsRepo(dbContext);
  return (req: ShoppingCartRequest, res: Response, next: NextFunction) => {
    const { owner } = req.params;
    const cart = dbRepo.findByCartOwner(owner);
    if (!cart) {
      return res
        .status(404)
        .json({ error: 'No cart with the specified owner', owner });
    } else {
      req.cart = cart;
      return next();
    }
  };
};

export default validateCartOwner;
