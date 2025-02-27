import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import AppProvider from '@/components/providers/AppProvider';
import { Toaster } from '@/components/ui/sonner';

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
			<body className={`${roboto.className} text-black antialiased`}>
				<AppProvider>{children}</AppProvider>
				<Toaster richColors />
			</body>
		</html>
	);
}
