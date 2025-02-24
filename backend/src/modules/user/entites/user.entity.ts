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
		name: 'created_at',
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;

	@Column({
		name: 'updated_at',
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt!: Date;

	@Column({ name: 'role_id' })
	roleId!: number;

	@ManyToOne(() => Role, (role) => role.users)
	@JoinColumn({ name: 'role_id' })
	role!: Role;
}
