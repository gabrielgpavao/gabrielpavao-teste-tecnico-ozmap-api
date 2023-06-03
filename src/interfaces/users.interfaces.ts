import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { z } from 'zod';
import { userInputDataSchema, userDataSchema } from '../schemas/users.schemas';

type tUserRepo = Repository<User>

type tUserInputData = z.infer<typeof userInputDataSchema>
type tUserOutputData = z.infer<typeof userDataSchema>

export {
	tUserRepo,
	tUserInputData,
	tUserOutputData
};
