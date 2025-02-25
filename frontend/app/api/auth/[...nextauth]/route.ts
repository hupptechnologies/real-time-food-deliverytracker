import NextAuth, {
	NextAuthOptions,
	Session as NextAuthSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

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
				if (!credentials) {
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

					const token = getTokenFromCookies(res);

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
							const role = {
								id: roleData.id,
								name: roleData.name,
							};
							const user = {
								id: String(userData.id),
								role: role,
								name: userData.name,
								email: userData.email,
								accessToken: token,
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
				session.user!.role = token.role;
			}
			if (token.accessToken) {
				session.accessToken = token.accessToken as string;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user && user.role) {
				token.role = user.role;
			}
			if (user && user.accessToken) {
				token.accessToken = user.accessToken;
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

function getTokenFromCookies(res: Response) {
	const token = res.headers
		.getSetCookie()?.[0]
		?.split(';')
		.find((cookie: string) => cookie.startsWith('authToken='))
		?.split('=')[1];
	return token;
}
