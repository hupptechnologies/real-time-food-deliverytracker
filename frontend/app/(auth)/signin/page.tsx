'use client';

import { useState, FormEvent } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import signInImage from '@/public/images/auth/signin.jpg';

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const result = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (!result?.error) {
			router.push('/');
		}
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="flex min-h-screen">
				<div className="relative hidden overflow-hidden lg:block lg:w-1/2">
					<Image
						src={signInImage}
						alt="Delicious Food"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/20" />
				</div>

				<div className="flex w-full items-center justify-center p-4 lg:w-1/2">
					<div className="w-full max-w-md space-y-8">
						<div className="text-center">
							<h1 className="mb-8 text-3xl font-bold text-gray-900">Login</h1>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email Address
								</label>
								<input
									id="email"
									type="email"
									placeholder="johndoe@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
									required
									autoComplete="username"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="••••••••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
										required
										autoComplete="current-password"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
									>
										{showPassword ? (
											<LuEyeOff className="h-5 w-5" />
										) : (
											<LuEye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember"
										type="checkbox"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
										className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<label
										htmlFor="remember"
										className="ml-2 block text-sm text-gray-700"
									>
										Keep me logged in
									</label>
								</div>
								<Link
									href="/forgot-password"
									className="text-sm font-medium text-blue-600 hover:text-blue-800"
								>
									Forgot Password?
								</Link>
							</div>

							<button
								type="submit"
								className="flex w-full justify-center rounded-lg border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							>
								Log In
							</button>
						</form>

						<p className="mt-8 text-center text-sm text-gray-600">
							Don&apos;t Have An Account?{' '}
							<Link
								href="/signup"
								className="font-semibold text-blue-600 hover:text-blue-800"
							>
								Signup
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
