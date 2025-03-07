import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const authPages = ['/', '/signin', '/signup'];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (session) {
		// User is logged in
		if (authPages.includes(pathname)) {
			const dashboardPath = getDashboardPath(session);
			return NextResponse.redirect(new URL(dashboardPath, req.url));
		}
	} else {
		// User is not logged in
		if (!authPages.includes(pathname)) {
			return NextResponse.redirect(new URL('/signin', req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

function getDashboardPath(session: any) {
	switch (session?.role?.name?.toLowerCase()) {
		case 'admin':
			return '/admin';
		case 'restaurant':
			return '/restaurant';
		case 'driver':
			return '/driver';
		default:
			return '/';
	}
}
