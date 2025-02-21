import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../../role/entities/role.entity';

@Entity('users_roles')
export class UserRole {
	@PrimaryColumn({ name: 'user_id' })
	userId!: number;

	@PrimaryColumn({ name: 'role_id' })
	roleId!: number;

	@Column({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		name: 'assigned_at',
	})
	assignedAt!: Date;

	@ManyToOne(() => User, (user) => user.userRoles)
	@JoinColumn({ name: 'user_id' })
	user!: User;

	@ManyToOne(() => Role, (role) => role.userRoles)
	@JoinColumn({ name: 'role_id' })
	role!: Role;
}
