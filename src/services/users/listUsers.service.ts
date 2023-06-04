import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUserOutputData, tUserRepo } from '../../interfaces/users.interfaces';
import { usersListSchema } from '../../schemas/users.schemas';

export async function listUsersService(): Promise<tUserOutputData[]> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const users: Array<User> = await userRepository.find();

	return usersListSchema.parse(users);
}
