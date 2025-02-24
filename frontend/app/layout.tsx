import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import AppProvider from '@/components/providers/AuthProvider';

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'DeliveryGo',
	description: 'A real-time food delivery tracking platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<AppProvider>
				<body className={`${roboto.className} antialiased`}>{children}</body>
			</AppProvider>
		</html>
	);
}
