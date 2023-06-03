import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { ZodTypeAny } from 'zod';

function validateEntryData(schema: ZodTypeAny): IMiddleware {
	return (ctx: Context, next: Next) => {
		ctx.request.body = schema.parse(ctx.request.body);
		next();
	};
}

export {
	validateEntryData
};
