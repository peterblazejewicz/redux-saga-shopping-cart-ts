import TaxesController from '../controllers/taxes-controller';
import UsersController from '../controllers/user-controller';
import YamlDbContext, { DbContext } from './../db/db-context';
import { Router } from 'express';

const api = Router();
const dbContext: DbContext = YamlDbContext.create();
const usersController = new UsersController(dbContext);
const taxesController = new TaxesController(dbContext);

// user
api.get('/user/:id', usersController.findById);
// taxes
api.get('/tax/:symbol', taxesController.findBySymbol);

export { api };
