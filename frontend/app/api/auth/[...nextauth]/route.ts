import NextAuth, {
	NextAuthOptions,
	Session as NextAuthSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT as NextAuthJWT } from 'next-auth/jwt';
import { User, Session, JWT, Role } from '@/types/auth';

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const BASE_URL = process.env.NEXT_API_URL;
				try {
					const res = await fetch(`${BASE_URL}/auth/login`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					});

					const responseData: any = await res.json();

					if (res.ok && responseData.success && responseData.data) {
						const userData = responseData.data;
						const roleData = userData.role;

						if (
							userData.id &&
							userData.email &&
							roleData &&
							roleData.id &&
							roleData.name
						) {
							const role: Role = {
								id: roleData.id,
								name: roleData.name,
							};
							const user: User = {
								id: String(userData.id),
								role: role,
								name: userData.email,
								email: userData.email,
								accessToken: responseData.data.token || responseData.token,
							};
							return user;
						} else {
							return null;
						}
					} else {
						return null;
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Login error:', error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({
			session,
			token,
		}: {
			session: NextAuthSession;
			token: NextAuthJWT;
		}) {
			if (session.user && token.role) {
				(session as Session).user!.role = token.role as Role;
			}
			if (token.accessToken) {
				(session as Session).accessToken = token.accessToken as string;
			}
			return session as Session;
		},
		async jwt({ token, user }: { token: NextAuthJWT; user?: User }) {
			if (user && user.role) {
				(token as JWT).role = user.role as Role;
			}
			if (user && user.accessToken) {
				(token as JWT).accessToken = user.accessToken as string;
			}
			return token;
		},
	},

	pages: {
		signIn: '/signin',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
