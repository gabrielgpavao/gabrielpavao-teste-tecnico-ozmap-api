import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJsonSchema from 'chai-json-schema';
import server from '../../../src';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../src/data-source';
import { User } from '../../../src/entities/users.entity';
import createUserMock from '../../mock/users/createUser.mock';
import updateUserMock from '../../mock/users/updateUser.mock';
import 'dotenv/config';

const PORT = Number(process.env.APP_PORT) || 3001;
const app = server.listen(PORT + 3);

chai.use(chaiHttp);
chai.use(chaiJsonSchema);


describe('PATCH /users/:id', () => {
	let connection: DataSource;

	const baseUrl = '/users/1';

	const userRepo = AppDataSource.getRepository(User);
	let createdUser: User;

	before(async () => {
		await AppDataSource.initialize()
			.then((res) => (connection = res))
			.catch((error) => console.error(error));
	});

	beforeEach(async () => {
		const users: User[] = await userRepo.find();
		await userRepo.remove(users);

		createdUser = await userRepo.save(createUserMock.validUser1);
	});

	after(async () => {
		await connection.destroy();
	});

	it('Success: Must be able to update an user - Full Body', (done) => {
		chai.request(app)
			.patch(baseUrl)
			.send(updateUserMock.validUserComplete)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.deep.equal({
					id: createdUser.id,
					...updateUserMock.validUserComplete
				});
				done();
			});
	});

	it('Success: Must be able to update an user - Partial Body', (done) => {
		chai.request(app)
			.patch(baseUrl)
			.send(updateUserMock.validUserPartial)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.deep.equal({
					...createdUser,
					age: updateUserMock.validUserPartial.age
				});
				done();
			});
	});
});
