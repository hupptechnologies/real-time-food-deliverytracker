import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { UserRole } from './user_role.entity';

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

	@OneToMany(() => UserRole, (userRole) => userRole.user)
	userRoles!: UserRole[];

	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable({
		name: 'users_roles',
		joinColumn: { name: 'user_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
	})
	roles?: Role[];
}
