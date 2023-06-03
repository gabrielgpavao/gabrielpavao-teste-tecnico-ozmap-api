import Router from 'koa-router';
import { createUserController } from '../controllers/users.controllers';

export const usersRoutes: Router = new Router({
	prefix: '/users'
});

usersRoutes.post('/', createUserController);
