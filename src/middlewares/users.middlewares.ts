import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { ZodTypeAny } from 'zod';
import { tUserRepo } from '../interfaces/users.interfaces';
import { AppDataSource } from '../data-source';
import { User } from '../entities/users.entity';
import { AppError } from './errors.middleware';

function validateEntryDataMiddleware(schema: ZodTypeAny): IMiddleware {
	return (ctx: Context, next: Next): void => {
		ctx.request.body = schema.parse(ctx.request.body);
		next();
	};
}

async function verifyEmailDuplicityMiddleware(ctx: Context, next: Next): Promise<void> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const payload: any = ctx.request.body;

	const findUser: User | null = await userRepository.findOneBy({ email: payload });

	if (findUser) {
		throw new AppError(409, 'Email already exists');
	}

	next();
}

async function verifyNameDuplicityMiddleware(ctx: Context, next: Next): Promise<void> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const payload: any = ctx.request.body;

	const findUser: User | null = await userRepository.findOneBy({ name: payload.name });

	if (findUser) {
		throw new AppError(409, 'Name already exists');
	}

	next();
}

export {
	validateEntryDataMiddleware,
	verifyEmailDuplicityMiddleware,
	verifyNameDuplicityMiddleware
};
