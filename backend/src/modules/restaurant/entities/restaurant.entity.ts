import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { MenuItem } from './menu-item.entity';

@Entity('restaurants')
export class Restaurant {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	owner_id!: number;

	@Column({ nullable: false })
	address!: number;

	@Column({ default: true })
	is_active?: boolean;

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

	@OneToMany(() => Order, (order) => order.restaurant)
	orders!: Order[];

	@OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
	menuItems!: MenuItem[];
}
