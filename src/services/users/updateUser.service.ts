import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUpdateUserInputData, tUserOutputData, tUserRepo } from '../../interfaces/users.interfaces';
import { AppError } from '../../middlewares/errors.middleware';
import { userDataSchema } from '../../schemas/users.schemas';

export async function updateUserService(userId: string, userData: tUpdateUserInputData): Promise<tUserOutputData> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const findOldUser: User | null = await userRepository.findOneBy({ id: +userId });

	if (!findOldUser) {
		throw new AppError(404, 'User not found');
	}

	const updatedUser: User = userRepository.create({
		...findOldUser,
		...userData
	});

	await userRepository.save(updatedUser);

	return userDataSchema.parse(updatedUser);
}
