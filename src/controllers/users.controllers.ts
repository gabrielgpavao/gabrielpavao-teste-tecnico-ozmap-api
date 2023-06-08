import { Context } from 'koa';
import { createUserService } from '../services/users/createUser.service';
import { tUserOutputData } from '../interfaces/users.interfaces';
import { listUsersService } from '../services/users/listUsers.service';
import { retrieveUserService } from '../services/users/retrieveUser.service';
import { deleteUserService } from '../services/users/deleteUser.service';
import { updateUserService } from '../services/users/updateUser.service';

async function createUserController(ctx: Context) {
	const payload: any = ctx.request.body;

	const newUser: tUserOutputData = await createUserService(payload);

	ctx.body = newUser;
	ctx.status = 201;
}

async function listUsersController(ctx: Context) {
	const page = Number(ctx.query.page) || 1;
	const perPage = Number(ctx.query.perPage) || 3;

	const usersList = await listUsersService(page, perPage);

	ctx.body = usersList;
	ctx.status = 200;
}

async function retrieveUserController(ctx: Context) {
	const userId: string = ctx.params.id;
	const user: tUserOutputData = await retrieveUserService(userId);

	ctx.body = user;
	ctx.status = 200;
}

async function updateUserController(ctx: Context) {
	const payload: any = ctx.request.body;
	const userId: string = ctx.params.id;

	const newUser: tUserOutputData = await updateUserService(userId, payload);

	ctx.body = newUser;
	ctx.status = 200;
}

async function deleteUserController(ctx: Context) {
	const userId: string = ctx.params.id;
	await deleteUserService(userId);

	ctx.status = 204;
}

export {
	createUserController,
	listUsersController,
	retrieveUserController,
	updateUserController,
	deleteUserController
};
