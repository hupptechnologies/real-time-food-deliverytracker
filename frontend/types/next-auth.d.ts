import { Role } from './auth';

declare module 'next-auth' {
	interface Session {
		accessToken?: string;
		user: {
			id: string;
			role: Role;
		} & DefaultSession['user'];
	}
	interface User {
		role: Role;
		accessToken?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role?: Role;
		accessToken?: string;
	}
}
