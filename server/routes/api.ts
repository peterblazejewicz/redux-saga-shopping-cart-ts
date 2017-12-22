import CardsController from '../controllers/cards-controller';
import TaxesController from '../controllers/taxes-controller';
import UsersController from '../controllers/user-controller';
import YamlDbContext, { DbContext } from './../db/db-context';
import { Router } from 'express';
import { validateCardOwner } from './../middlewares/';
import { validateCartOwner } from './../middlewares';
import CartsController from '../controllers/carts-controller';

const api = Router();
const dbContext: DbContext = YamlDbContext.create();
const usersController = new UsersController(dbContext);
const taxesController = new TaxesController(dbContext);
const cardsController = new CardsController(dbContext);
const cartsController = new CartsController(dbContext);
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

// user
api.get('/user/:id', usersController.findById);

// taxes
api.get('/tax/:symbol', taxesController.findBySymbol);

// card
api.get('/card/charge/:owner', cardsController.chargeOwner);

// cart
api.get('/cart/validate/:owner', cartsController.checkAvailableQuantity);
api.get('/cart/:owner', cartsController.getCartForOwner);
api.get('/cart/add/:owner/:itemID', cartsController.addItemToCart);
api.get('/cart/remove/:owner/:itemID', cartsController.removeItemFromCart);


export { api };
