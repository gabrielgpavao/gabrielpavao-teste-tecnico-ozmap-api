import { Context } from 'koa';
import { createUserService } from '../services/users/createUser.service';
import { userInputDataSchema } from '../schemas/users.schemas';
import { tUserInputData, tUserOutputData } from '../interfaces/users.interfaces';
import { listUsersService } from '../services/users/listUsers.service';

async function createUserController(ctx: Context) {
	const userData: tUserInputData = userInputDataSchema.parse(ctx.request.body);
	const newUser: tUserOutputData = await createUserService(userData);

	ctx.body = newUser;
	ctx.status = 201;
}

async function listUsersController(ctx: Context) {
	const usersList: Array<tUserOutputData> = await listUsersService();

	ctx.body = usersList;
	ctx.status = 200;
}

export {
	createUserController,
	listUsersController
};
