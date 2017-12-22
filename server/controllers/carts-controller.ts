import { DbContext } from './../db/db-context';
import { Request, Response } from 'express';
import { ShoppingCartRequest } from './../models/ShoppingCardRequest';
import ItemsRepo from '../db/ItemsRepo';
import CartsRepo from '../db/CartsRepo';

/**
 * @export
 * @class CartsController
 */
export default class CartsController {
  private itemsRepo: ItemsRepo;
  private cartsRepo: CartsRepo;
  constructor(dbContext: DbContext) {
    this.itemsRepo = new ItemsRepo(dbContext);
    this.cartsRepo = new CartsRepo(dbContext);
  }

  /**
   *
   *
   * @memberof CartsController
   */
  public addItemToCart() {
    return this.makeCartAdjustmentRoute(true);
  }

  /**
   *
   *
   * @memberof CartsController
   */
  public removeItemFromCart() {
    return this.makeCartAdjustmentRoute(false);
  }

  /**
   * checks if there is enough items available
   * @memberof CartsController
   */
  public checkAvailableQuantity = (req: ShoppingCartRequest, res: Response) => {
    const { items = [] } = req.cart;
    let validated = true;
    let error = null;
    items.forEach(({ id, quantity }) => {
      const item = this.itemsRepo.findItemById(id);
      if (item && item.quantityAvailable < quantity) {
        validated = false;
        error = 'There is an insufficient quantity of ' + id;
      }
    });
    res.status(200).json({ validated, error });
  };

  public getCartForOwner = (req: ShoppingCartRequest, res: Response) => {
    const cart = req.cart;
    res.status(200).json(cart);
  };

  // private

  private makeCartAdjustmentRoute = (shouldAdd = true) => (
    req: Request,
    res: Response
  ) => {
    const { owner, itemID } = req.params;
    const cart = this.cartsRepo.findByCartOwner(owner);
    if (!cart) {
      return res.status(500).json({
        error: 'No cart found with the specified ID',
        owner
      });
    }

    const item = this.itemsRepo.findItemById(itemID);
    if (!item) {
      return res.status(500).json({
        error: 'No item found with the specified ID',
        itemID
      });
    }

    const existingItem = cart.items.find(cartItem => cartItem.id === itemID);
    if (existingItem) {
      if (shouldAdd && existingItem.quantity >= item.quantityAvailable) {
        return res.status(503).json({
          error: 'An insufficient quantity of items remains.',
          itemID,
          quantityAvailable: item.quantityAvailable
        });
      }
      existingItem.quantity += shouldAdd ? 1 : -1;
      if (existingItem.quantity === 0) {
        cart.items = cart.items.filter(item => item.id !== itemID);
      }
    } else {
      if (shouldAdd) {
        cart.items.push({
          quantity: 1,
          id: itemID
        });
      } else {
        return res.status(500).json({
          error:
            'No item with the specified ID exists in the cart to be removed',
          owner,
          itemID
        });
      }
    }
    return res.status(200).send(cart);
  };
}
