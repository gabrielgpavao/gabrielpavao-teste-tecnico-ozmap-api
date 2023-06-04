import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { createUserController, deleteUserController, listUsersController, retrieveUserController, updateUserController } from '../controllers/users.controllers';
import { validateEntryDataMiddleware, verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware } from '../middlewares/users.middlewares';
import { userInputDataSchema } from '../schemas/users.schemas';

export const usersRoutes: Router = new Router({
	prefix: '/users'
});

usersRoutes.post('/', bodyParser(), validateEntryDataMiddleware(userInputDataSchema), verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware, createUserController);

usersRoutes.get('/', listUsersController);

usersRoutes.get('/:id', retrieveUserController);

usersRoutes.put('/:id', updateUserController);

usersRoutes.delete('/:id', deleteUserController);
