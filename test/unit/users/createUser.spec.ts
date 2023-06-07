import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJsonSchema from 'chai-json-schema';
import server from '../../../src';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../src/data-source';
import { User } from '../../../src/entities/users.entity';
import createUserMock from '../../mock/users/createUser.mock';
import 'dotenv/config';

const PORT = Number(process.env.APP_PORT) || 3001;
const app = server.listen(PORT);

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('POST /users', () => {
	let connection: DataSource;

	const baseUrl = '/users';

	const userRepo = AppDataSource.getRepository(User);

	before(async () => {
		await AppDataSource.initialize()
			.then((res) => (connection = res))
			.catch((error) => console.error(error));
	});

	beforeEach(async () => {
		const users: Array<User> = await userRepo.find();
		await userRepo.remove(users);
	});

	after(async () => {
		await connection.destroy();
	});

	it('Success: Must be able to create an user', (done) => {
		chai.request(app)
			.post(baseUrl)
			.send(createUserMock.validUser1)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(201);
				expect(res.body).to.deep.equal({
					id: 1,
					...createUserMock.validUser1
				});
				done();
			});
	});
});
