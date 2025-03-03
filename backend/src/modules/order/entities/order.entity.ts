import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: false })
	restaurant_id!: number;

	@Column({ nullable: false })
	customer_id!: number;

	@Column({ nullable: true })
	driver_id?: number;

	@Column({ nullable: true })
	payment_id?: string;

	@Column({ nullable: false })
	status!: string;

	@Column({ nullable: true })
	eta?: Date;

	@Column({ nullable: true })
	actual_delivery_time?: Date;

	@Column({ nullable: false, unique: true })
	order_number: string;

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
}
