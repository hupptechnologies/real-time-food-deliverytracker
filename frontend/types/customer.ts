export interface Role {
	id: number;
	name: string;
	description?: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface Customer {
	id: number;
	name: string;
	email: string;
	role: number | Role;
	created_at: Date;
	updated_at: Date;
}
