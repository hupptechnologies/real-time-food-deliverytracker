export interface Role {
	id: number;
	name: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface Customer {
	id: number;
	name: string;
	email: string;
	role: number | Role;
	createdAt: Date;
	updatedAt: Date;
}
