import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('increment')
		id: number;

	@Column({ type: 'varchar', length: '45', unique: true })
		name: string;

	@Column({ type: 'varchar', length: '127', unique: true })
		email: string;

	@Column({ type: 'int' })
		age: number;
}
