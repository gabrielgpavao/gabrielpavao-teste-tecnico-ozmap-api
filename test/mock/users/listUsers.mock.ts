import { Repository } from 'typeorm';
import { AppDataSource } from '../../../src/data-source';
import { User } from '../../../src/entities/users.entity';

type tUserRepo = Repository<User>;

const listUsersMock = async (): Promise<User[]> => {
	const userRepo: tUserRepo = AppDataSource.getRepository(User);
	const totalUsers = 5;

	return await userRepo.save(
		Array.from(Array(totalUsers))
			.map((_, index) => {
				const name = `user${index}`;
				const email = `${name}@mail.com`;
				const age = index + 18;

				return {
					name,
					email,
					age
				};
			})
	);
};

export default listUsersMock;
