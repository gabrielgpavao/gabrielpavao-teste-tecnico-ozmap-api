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
	const invalidIdUrl = '/users/9999';

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

	it('Error: Must not be able to update an user - User not found', (done) => {
		chai.request(app)
			.patch(invalidIdUrl)
			.send(updateUserMock.validUserPartial)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(404);
				expect(res.body).to.deep.equal({
					code: 404,
					message: 'User not found'
				});
				done();
			});
	});

	it('Error: Must not be able to update an user - Invalid Body', (done) => {
		chai.request(app)
			.patch(baseUrl)
			.send(updateUserMock.invalidBodyUser)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res.body).to.deep.equal({
					email: [
						'Expected string, received array'
					],
					name: [
						'Expected string, received number'
					]
				});
				done();
			});
	});

	it('Error: Must not be able to update an user - Name already exists', (done) => {
		chai.request(app)
			.patch(baseUrl)
			.send(updateUserMock.nameAlreadyExistsUser)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(409);
				expect(res.body).to.deep.equal({
					code: 409,
					message: 'Name already exists'
				});
				done();
			});
	});

	it('Error: Must not be able to update an user - Email already exists', (done) => {
		chai.request(app)
			.patch(baseUrl)
			.send(updateUserMock.emailAlreadyExistsUser)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(409);
				expect(res.body).to.deep.equal({
					code: 409,
					message: 'Email already exists'
				});
				done();
			});
	});
});
