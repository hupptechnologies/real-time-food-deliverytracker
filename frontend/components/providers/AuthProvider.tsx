'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ThemeProvider } from './ThemeProvider';
import { useState } from 'react';

export default function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			> */}
			{children}
			{/* </ThemeProvider> */}
		</QueryClientProvider>
	);
}
