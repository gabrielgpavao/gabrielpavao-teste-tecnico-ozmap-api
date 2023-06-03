import { Context } from 'koa';

async function createUserController(ctx: Context) {
	ctx.body = 'It should create an User';
	ctx.status = 201;
}

export {
	createUserController
};
