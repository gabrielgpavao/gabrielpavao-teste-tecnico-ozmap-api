import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUserRepo } from '../../interfaces/users.interfaces';
import { AppError } from '../../middlewares/errors.middleware';

export async function deleteUserService(userId: string): Promise<void> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const user: User | null = await userRepository.findOneBy({ id: +userId });

	if (!user) {
		throw new AppError(404, 'User not found');
	}

	await userRepository.delete(user);
}
