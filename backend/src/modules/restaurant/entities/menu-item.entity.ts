import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('menu_items')
export class MenuItem {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'uuid', name: 'restaurant_id' })
	restaurant_id!: string;

	@Column({ type: 'varchar', length: 255 })
	name!: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price!: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	image_url?: string;

	@Column({ type: 'text', nullable: true })
	ingredients?: string;

	@Column({ type: 'boolean', default: true, name: 'is_available' })
	is_available!: boolean;

	@Column({ type: 'integer', nullable: true, name: 'display_order' })
	display_order?: number;

	@CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
	created_at!: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
	updated_at!: Date;

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
	@JoinColumn({ name: 'restaurant_id' })
	restaurant!: Restaurant;
}
