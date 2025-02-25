import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		if (!name || !email || !password) {
			return NextResponse.json(
				{ success: false, message: 'Missing required fields' },
				{ status: 400 },
			);
		}

		const BASE_URL = process.env.NEXT_API_URL;

		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		});

		const responseData = await response.json();

		if (!response.ok || !responseData.success) {
			const errorMessage = responseData.message || 'Signup failed on backend';
			return NextResponse.json(
				{
					success: false,
					message: errorMessage,
					error: responseData.error,
				},
				{ status: response.status || 400 },
			);
		}
		return NextResponse.json(responseData, { status: 201 });
	} catch (error: any) {
		// eslint-disable-next-line no-console
		console.error('Signup API route error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Signup API route error',
				error: error.message || 'Unknown error',
			},
			{ status: 500 },
		);
	}
}
