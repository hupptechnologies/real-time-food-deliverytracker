export interface AuthenticatedUser {
	id: number;
	role: string;
}

declare global {
	namespace Express {
		export interface Request {
			user?: AuthenticatedUser;
		}
	}
}
