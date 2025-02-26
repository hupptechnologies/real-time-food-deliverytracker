import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (['/signin', '/signup'].includes(pathname) && session) {
		return NextResponse.redirect(new URL(getDashboardPath(session), req.url));
	}

	return NextResponse.next();
}

function getDashboardPath(session: any) {
	switch (session?.role?.name?.toLowerCase()) {
		case 'admin':
			return '/admin';
		case 'restaurant':
			return '/restaurant/dashboard';
		case 'driver':
			return '/driver/dashboard';
		default:
			return '/';
	}
}
