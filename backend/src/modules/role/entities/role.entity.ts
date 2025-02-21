import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	OneToMany,
} from 'typeorm';
import { User } from '../../user/entites/user.entity';
import { UserRole } from '../../user/entites/user_role.entity';

@Entity('roles')
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	name!: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@Column({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;

	@Column({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt!: Date;

	@OneToMany(() => UserRole, (userRole) => userRole.role)
	userRoles!: UserRole[];

	@ManyToMany(() => User, (user) => user.roles)
	users?: User[];
}
