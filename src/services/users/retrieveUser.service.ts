import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUserOutputData, tUserRepo } from '../../interfaces/users.interfaces';
import { userDataSchema } from '../../schemas/users.schemas';

export async function retrieveUserService(userId: string): Promise<tUserOutputData> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const user: User | null = await userRepository.findOneBy({ id: +userId });

	return userDataSchema.parse(user);
}
