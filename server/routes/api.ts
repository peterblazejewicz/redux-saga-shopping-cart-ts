import YamlDbContext, { DbContext } from './../db/db-context';
import {
  CardsController,
  CartsController,
  ItemsController,
  TaxesController,
  UsersController
} from './../controllers';
import { Router } from 'express';
import { validateCardOwner, validateCartOwner } from './../middlewares';

const api = Router();
const dbContext: DbContext = YamlDbContext.create();

const cardsController = new CardsController(dbContext);
const cartsController = new CartsController(dbContext);
const itemsController = new ItemsController(dbContext);
const taxesController = new TaxesController(dbContext);
const usersController = new UsersController(dbContext);

const validateCardOwnerMiddleware = validateCardOwner(dbContext);
const validateCartOwnerMiddleware = validateCartOwner(dbContext);

// middlewares

api.use(
  ['/card/validate/:owner', '/card/charge/:owner'],
  validateCardOwnerMiddleware
);
api.use(
  ['/cart/validate/:owner', '/cart/:owner', '/card/charge/:owner'],
  validateCartOwnerMiddleware
);

// card
api.get('/card/charge/:owner', cardsController.chargeOwner);

// cart
api.get('/cart/validate/:owner', cartsController.checkAvailableQuantity);
api.get('/cart/:owner', cartsController.getCartForOwner);
api.get('/cart/add/:owner/:itemID', cartsController.addItemToCart);
api.get('/cart/remove/:owner/:itemID', cartsController.removeItemFromCart);

// items
api.get('/items/:ids', itemsController.getItemsByIds);

// taxes
api.get('/tax/:symbol', taxesController.findBySymbol);

// user
api.get('/user/:id', usersController.findById);

export { api };
