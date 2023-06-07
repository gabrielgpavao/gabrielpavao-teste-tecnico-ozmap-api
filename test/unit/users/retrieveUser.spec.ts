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
const app = server.listen(PORT + 2);

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('GET /users/:id', () => {
	let connection: DataSource;
	const userRepo = AppDataSource.getRepository(User);
	const baseUrl = '/users/1';
	const invalidIdUrl = '/users/9999';

	let usersList: Array<User>;

	before(async () => {
		await AppDataSource.initialize()
			.then(async (res) => {
				connection = res;
				await userRepo.save(createUserMock.validUser1);
				await userRepo.save(createUserMock.uniqueNameUser);
				usersList = await userRepo.find();
			})
			.catch((error) => console.error(error));
	});

	after(async () => {
		await connection.destroy();
	});

	it('Success: Must be able to retrieve an user by its ID', (done) => {
		chai.request(app)
			.get(baseUrl)
			.send()
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.deep.equal(usersList[0]);
				done();
			});
	});

	it('Error: Must not be able to retrieve an user - User not found', (done) => {
		chai.request(app)
			.get(invalidIdUrl)
			.send()
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(404);
				expect(res.body).to.deep.equal({
					code: 404,
					message: 'User not found'
				});
				done();
			});
	});
});
