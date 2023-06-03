import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('increment')
		id: number;

	@Column({ type: 'varchar', length: '127' })
		name: string;

	@Column({ type: 'varchar', length: '127' })
		email: string;

	@Column({ type: 'int' })
		age: number;
}
