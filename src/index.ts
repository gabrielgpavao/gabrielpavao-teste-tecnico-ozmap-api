import Koa from 'koa';
import Router from 'koa-router';
import { handleErrorsMiddleware } from './middlewares/errors.middleware'

const app = new Koa();
const router = new Router();

app.use(handleErrorsMiddleware);
app.use(router.routes()).use(router.allowedMethods());

export default app;
