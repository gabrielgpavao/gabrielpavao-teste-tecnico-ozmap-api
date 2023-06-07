export const userSchema = {
	title: 'User Schema',
	type: 'object',
	required: ['id', 'name', 'email', 'age'],
	properties: {
		id: {
			type: 'number'
		},
		name: {
			type: 'string'
		},
		email: {
			type: 'string'
		},
		age: {
			type: 'number',
			minimum: 18
		}
	}
};
