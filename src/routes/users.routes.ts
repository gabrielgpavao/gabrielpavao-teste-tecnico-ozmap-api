import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { createUserController, deleteUserController, listUsersController, retrieveUserController, updateUserController } from '../controllers/users.controllers';
import { ensureUserExistsMiddleware, validateEntryDataMiddleware, verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware } from '../middlewares/users.middlewares';
import { updateUserInputDataSchema, userInputDataSchema } from '../schemas/users.schemas';

export const usersRoutes: Router = new Router({
	prefix: '/users'
});

usersRoutes.post('/', bodyParser(), validateEntryDataMiddleware(userInputDataSchema), verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware, createUserController);

usersRoutes.get('/', listUsersController);

usersRoutes.get('/:id', ensureUserExistsMiddleware, retrieveUserController);

usersRoutes.patch('/:id', bodyParser(), ensureUserExistsMiddleware, validateEntryDataMiddleware(updateUserInputDataSchema), verifyEmailDuplicityMiddleware, verifyNameDuplicityMiddleware, updateUserController);

usersRoutes.delete('/:id', ensureUserExistsMiddleware, deleteUserController);
