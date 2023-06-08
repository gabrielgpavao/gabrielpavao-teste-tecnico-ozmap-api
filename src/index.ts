import Koa from 'koa';
import { handleErrorsMiddleware } from './middlewares/errors.middleware';
import { usersRoutes } from './routes/users.routes';
import { docsRoutes } from './routes/docs.routes';
import cors from 'kcors';

const app: Koa = new Koa();

app.use(cors({ origin: '*' }));

app.use(docsRoutes.routes()).use(docsRoutes.allowedMethods());

app.use(handleErrorsMiddleware);
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());

export default app;
