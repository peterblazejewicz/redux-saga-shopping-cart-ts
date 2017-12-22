import { Card } from './Card';
import { Cart } from './Cart';
import { Request } from 'express';

export interface ShoppingCartRequest extends Request {
  cart: Cart;
  card: Card;
}
