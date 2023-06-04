import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { createUserController } from '../controllers/users.controllers';
import { validateEntryDataMiddleware, verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware } from '../middlewares/users.middlewares';
import { userInputDataSchema } from '../schemas/users.schemas';

export const usersRoutes: Router = new Router({
	prefix: '/users'
});

usersRoutes.post('/', bodyParser(), validateEntryDataMiddleware(userInputDataSchema), verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware, createUserController);
