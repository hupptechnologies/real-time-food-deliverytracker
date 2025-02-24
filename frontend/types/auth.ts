import { Session as NextAuthSession, User as NextAuthUser } from 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

export interface Role {
	id: number;
	name: string;
}

export interface User extends NextAuthUser {
	role?: Role;
	accessToken?: string;
}

export interface Session extends NextAuthSession {
	accessToken?: string;
	user?: User & NextAuthSession['user'];
}

export interface JWT extends NextAuthJWT {
	role?: Role;
	accessToken?: string;
}
