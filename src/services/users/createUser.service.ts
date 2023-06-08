import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUserInputData, tUserOutputData, tUserRepo } from '../../interfaces/users.interfaces';
import { userDataSchema } from '../../schemas/users.schemas';

export async function createUserService(userData: tUserInputData): Promise<tUserOutputData> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const newUser: User = userRepository.create(userData);

	await userRepository.save(newUser);

	return userDataSchema.parse(newUser);
}
