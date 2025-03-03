import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	email!: string;

	@Column({ nullable: false, select: false })
	password?: string;

	@Column({ nullable: true })
	name?: string;

	@Column({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	created_at!: Date;

	@Column({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updated_at!: Date;

	@Column({ name: 'role_id' })
	roleId!: number;

	@ManyToOne(() => Role, (role) => role.users)
	@JoinColumn({ name: 'role_id' })
	role!: Role;
}
