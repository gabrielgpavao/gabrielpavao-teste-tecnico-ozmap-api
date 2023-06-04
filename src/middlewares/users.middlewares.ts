import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { ZodTypeAny } from 'zod';
import { tUserRepo } from '../interfaces/users.interfaces';
import { AppDataSource } from '../data-source';
import { User } from '../entities/users.entity';
import { userInputDataSchema } from '../schemas/users.schemas';
import { AppError } from './errors.middleware';

function validateEntryData(schema: ZodTypeAny): IMiddleware {
	return (ctx: Context, next: Next): void => {
		ctx.request.body = schema.parse(ctx.request.body);
		next();
	};
}

async function verifyEmailDuplicity(ctx: Context, next: Next): Promise<void> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const findUser: User | null = await userRepository.findOneBy({
		email: userInputDataSchema.parse(ctx.request.body).email
	});

	if (findUser) {
		throw new AppError(409, 'Email already exists');
	}

	next();
}

export {
	validateEntryData,
	verifyEmailDuplicity
};
