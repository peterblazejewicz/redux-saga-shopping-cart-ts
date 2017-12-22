import YamlDbContext, { DbContext } from './../db/db-context';
import { Router } from 'express';
import UsersController from '../controllers/user-controller';

const api = Router();
const dbContext: DbContext = YamlDbContext.create();
const usersController = new UsersController(dbContext);


api.get('/user/:id', usersController.findById);

export { api };
