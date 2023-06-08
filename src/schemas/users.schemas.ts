import { z } from 'zod';

const userDataSchema = z.object({
	id: z.number().int(),
	name: z.string().max(45),
	email: z.string().email().max(127),
	age: z.number().int().min(18)
});

const userInputDataSchema = userDataSchema.omit({
	id: true
});

const usersListSchema = userDataSchema.array();

const updateUserInputDataSchema = userInputDataSchema.deepPartial();

export {
	userInputDataSchema,
	userDataSchema,
	usersListSchema,
	updateUserInputDataSchema
};
