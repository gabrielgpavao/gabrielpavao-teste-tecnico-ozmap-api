//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables

import Koa from 'koa';
import Router from 'koa-router';


const app = new Koa();
const router = new Router();

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
	ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', async (ctx) => {
	ctx.status = 200;
	ctx.body = {total:0, count: 0, rows:[]};
});

const PORT: string | number = process.env.PORT || 3000;

app
	.use(router.routes())
	.use(router.allowedMethods());

export const server = app.listen(PORT);

export default app;
