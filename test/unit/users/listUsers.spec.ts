import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJsonSchema from 'chai-json-schema';
import server from '../../../src';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../src/data-source';
import { User } from '../../../src/entities/users.entity';
import listUsersMock from '../../mock/users/listUsers.mock';
import 'dotenv/config';

const PORT = Number(process.env.APP_PORT) || 3001;
const app = server.listen(PORT + 1);

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('GET /users', () => {
	let connection: DataSource;

	const baseUrl = '/users';

	before(async () => {
		await AppDataSource.initialize()
			.then(async (res) => {
				connection = res;
			})
			.catch((error) => console.error(error));
	});

	after(async () => {
		await connection.destroy();
	});

	it('Success: Must return an empty array', (done) => {
		chai.request(app)
			.get(baseUrl)
			.send()
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.deep.equal({
					prevPage: null,
					nextPage: null,
					count: 0,
					data: []
				});
				done();
			});
	});

	it('Success: Must list all users with pagination', async () => {
		const userList: Array<User> = await listUsersMock();

		const res = await chai.request(app)
			.get(baseUrl)
			.send();

		expect(res).to.have.status(200);
		expect(res.body).to.deep.equal({
			prevPage: null,
			nextPage: `http://localhost:${PORT}${baseUrl}?page=2&perPage=3`,
			count: 5,
			data: userList.filter((_, index) => index < 3)
		});
	});
});
