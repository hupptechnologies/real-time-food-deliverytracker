import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_history')
export class OrderHistory {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: false })
	order_id!: string;

	@Column({ nullable: false })
	status!: string;

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

	@ManyToOne(() => Order, (order) => order.orderHistories)
	@JoinColumn({ name: 'order_id' })
	order!: Order;
}
