import { AppDataSource } from '../../data-source';
import { User } from '../../entities/users.entity';
import { tUserRepo } from '../../interfaces/users.interfaces';
import { usersListSchema } from '../../schemas/users.schemas';
import 'dotenv/config';

export async function listUsersService(page: number, perPage: number) {
	if (page <= 0 || !Number.isInteger(page)) {
		page = 1;
	}

	if (perPage <= 0 || perPage > 3 || !Number.isInteger(perPage)) {
		perPage = 3;
	}

	const userRepository: tUserRepo = AppDataSource.getRepository(User);

	const users: Array<User> = await userRepository.find({
		take: perPage,
		skip: perPage * (page - 1),
		order: { id: 'ASC' }
	});

	const PORT: number | string = process.env.APP_PORT || 3001;
	const baseUrl = `http://localhost:${PORT}`;
	const count: number = await userRepository.count();
	const maxPage: number = Math.ceil(count/perPage);

	const prevPage: string | null = page === 1 || page > maxPage + 1 ? null : `${baseUrl}/users?page=${page - 1}&perPage=${perPage}`;
	const nextPage: string | null = page >= maxPage ? null : `${baseUrl}/users?page=${page + 1}&perPage=${perPage}`;

	const handleResponse = {
		prevPage,
		nextPage,
		count,
		data: usersListSchema.parse(users)
	};

	return handleResponse;
}
