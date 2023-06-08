import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';

export const docsRoutes: Router = new Router({
	prefix: '/swagger'
});

const spec = yamljs.load('./api.yaml');

docsRoutes.use(koaSwagger({ swaggerOptions: { spec } }));

docsRoutes.get('/', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
