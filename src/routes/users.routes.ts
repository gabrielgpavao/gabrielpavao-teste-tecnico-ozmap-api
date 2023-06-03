import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { createUserController } from '../controllers/users.controllers';

export const usersRoutes: Router = new Router({
	prefix: '/users'
});

usersRoutes.post('/', bodyParser(), createUserController);
