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
const app = server.listen(PORT + 4);

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('DELETE /users/:id', () => {
	let connection: DataSource;

	const userRepo = AppDataSource.getRepository(User);

	const baseUrl = '/users/1';
	const invalidIdUrl = '/users/9999';

	before(async () => {
		await AppDataSource.initialize()
			.then((res) => (connection = res))
			.catch((error) => console.error(error));
	});

	beforeEach(async () => {
		const users: User[] = await userRepo.find();
		await userRepo.remove(users);

		await userRepo.save(createUserMock.validUser1);
	});

	after(async () => {
		await connection.destroy();
	});

	it('Success: Must be able to delete an user by its ID', (done) => {
		chai.request(app)
			.delete(baseUrl)
			.send()
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(204);
				expect(res.body).to.deep.equal({});
				done();
			});
	});

	it('Error: Must not be able to delete an user - User not found', (done) => {
		chai.request(app)
			.delete(invalidIdUrl)
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
