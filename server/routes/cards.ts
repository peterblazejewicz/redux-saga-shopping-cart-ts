import { Router } from 'express';
import { ShoppingCartRequest } from './../models/ShoppingCardRequest';

const CardsRoute = Router();
CardsRoute.get('/card/validate/:owner', (req: ShoppingCartRequest, res) => {
  const { card } = req;
  res.status(200).json({ validated: true, card });
});

export {
  CardsRoute }

