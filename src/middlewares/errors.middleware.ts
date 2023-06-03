import { Context, Next } from 'koa';
import { ZodError } from 'zod';

class AppError extends Error {
	public code: number;

	constructor(code: number, message: string) {
		super(message);

		this.code = code;
	}

	public toModel() {
		return {
			code: this.code,
			message: this.message
		};
	}
}

async function handleErrorsMiddleware (ctx: Context, next: Next) {
	try {
		await next();
	} catch (error) {
		if (error instanceof AppError) {
			ctx.body = error.toModel();
			ctx.status = error.code;
		} else if (error instanceof ZodError) {
			ctx.body = error.flatten().fieldErrors;
			ctx.status = 400;
		} else {
			ctx.body = new AppError(500, 'Internal Error Server');
			ctx.status = 500;
		}
	}
}

export {
	AppError,
	handleErrorsMiddleware
};
