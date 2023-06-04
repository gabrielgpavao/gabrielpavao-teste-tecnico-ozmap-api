import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUserOutputData, tUserRepo } from '../../interfaces/users.interfaces';
import { AppError } from '../../middlewares/errors.middleware';
import { userDataSchema } from '../../schemas/users.schemas';

export async function retrieveUserService(userId: string): Promise<tUserOutputData> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const user: User | null = await userRepository.findOneBy({ id: +userId });

	if (!user) {
		throw new AppError(404, 'User not found');
	}

	return userDataSchema.parse(user);
}
