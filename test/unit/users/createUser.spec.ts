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

	it('Error: Must not be able to create an user - Name already exists', async () => {
		await userRepo.save(createUserMock.uniqueNameUser);

		const res = await chai.request(app)
			.post(baseUrl)
			.send(createUserMock.nameAlreadyExistsUser);

		expect(res).to.have.status(409);
		expect(res.body).to.deep.equal({
			code: 409,
			message: 'Name already exists'
		});
	});

	it('Error: Must not be able to create an user - Email already exists', async () => {
		await userRepo.save(createUserMock.uniqueEmailUser);

		const res = await chai.request(app)
			.post(baseUrl)
			.send(createUserMock.emailAlreadyExistsUser);

		expect(res).to.have.status(409);
		expect(res.body).to.deep.equal({
			code: 409,
			message: 'Email already exists'
		});
	});

	it('Error: Must not be able to create an user - Invalid Age', (done) => {
		chai.request(app)
			.post(baseUrl)
			.send(createUserMock.invalidAgeUser)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res.body).to.deep.equal({
					age: [
						'Number must be greater than or equal to 18'
					]
				});
				done();
			});
	});

	it('Error: Must not be able to create an user - Invalid Body', (done) => {
		chai.request(app)
			.post(baseUrl)
			.send(createUserMock.invalidBodyUser)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res.body).to.deep.equal({
					name: [
						'Expected string, received boolean'
					],
					email: [
						'Invalid email'
					],
					age: [
						'Expected number, received string'
					]
				});
				done();
			});
	});
});
