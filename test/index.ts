import chai, { expect } from 'chai';
import server from '../src/index';
import { AppDataSource } from '../src/data-source';
import { DataSource } from 'typeorm';

const PORT = 3000;
const app = server.listen(PORT);

describe('Heathcheck', () => {
	let connection: DataSource;

	before(async () => {
		await AppDataSource.initialize()
			.then((res) => (connection = res))
			.catch((error) => console.error(error));
	});

	after(async () => {
		await connection.destroy();
	});

	it('Server must be connected', function (done) {
		chai.request(app)
			.get('/users')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});
});
