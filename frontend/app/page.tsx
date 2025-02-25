import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { LuSearch, LuClock4, LuMapPin, LuStar } from 'react-icons/lu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function Home() {
	const session = await getServerSession();
	if (session) {
		const userRole = session.user?.role;
		switch (userRole) {
			case 'admin':
				redirect('/admin/dashboard');
			case 'driver':
				redirect('/driver/dashboard');
			case 'restaturant':
				redirect('/restaurant/dashboard');
		}
	}
	return (
		<div className="flex min-h-screen flex-col bg-white">
			<Header />

			{/* Hero Section */}
			<section className="relative h-[600px]">
				<Image
					src="/images/home/image_1.jpg"
					alt="Delicious Food"
					fill
					className="object-cover brightness-50"
					priority
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="mx-auto max-w-4xl px-4 text-center">
						<h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
							Delicious Food Delivered To Your Doorstep
						</h1>
						<p className="mb-8 text-xl text-gray-200">
							Order from your favorite restaurants and track your delivery in
							real-time
						</p>
						<div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
							<input
								type="text"
								placeholder="Enter your delivery address"
								className="w-full rounded-lg bg-white px-6 py-3 text-gray-900"
							/>
							<button className="min-w-40 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-600">
								Find Food
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
					<div className="grid gap-8 md:grid-cols-3">
						<div className="text-center">
							<div className="rounded-lg bg-white p-6 shadow-md">
								<LuSearch className="mx-auto mb-4 h-12 w-12 text-red-500" />
								<h3 className="mb-2 text-xl font-semibold">Find Restaurant</h3>
								<p className="text-gray-600">
									Browse restaurants that deliver to your area
								</p>
							</div>
						</div>
						<div className="text-center">
							<div className="rounded-lg bg-white p-6 shadow-md">
								<LuClock4 className="mx-auto mb-4 h-12 w-12 text-red-500" />
								<h3 className="mb-2 text-xl font-semibold">Choose Your Food</h3>
								<p className="text-gray-600">
									Browse menus and place an order in seconds
								</p>
							</div>
						</div>
						<div className="text-center">
							<div className="rounded-lg bg-white p-6 shadow-md">
								<LuMapPin className="mx-auto mb-4 h-12 w-12 text-red-500" />
								<h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
								<p className="text-gray-600">
									Get your food delivered and enjoy your meal
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Popular Categories */}
			<section className="py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-8 text-3xl font-bold">Popular Categories</h2>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						{[
							{
								name: 'Pizza',
								image: '/images/home/pizza.jpg',
							},
							{
								name: 'Burgers',
								image: '/images/home/burgers.jpg',
							},
							{
								name: 'Sushi',
								image: '/images/home/sushi.jpeg',
							},
							{
								name: 'Desserts',
								image: '/images/home/desserts.jpeg',
							},
						].map((category) => (
							<Link
								key={category.name}
								href={`/category/${category.name.toLowerCase()}`}
								className="group relative h-40 overflow-hidden rounded-lg"
							>
								<Image
									src={category.image}
									alt={category.name}
									fill
									className="object-cover transition-transform duration-200 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
								<span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
									{category.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Featured Restaurants */}
			<section className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-8 text-3xl font-bold">Featured Restaurants</h2>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								name: 'Pizza Palace',
								image: '/images/home/restaurant_1.jpeg',
								rating: '4.8',
								cuisine: 'Italian',
								deliveryTime: '30-40 min',
							},
							{
								name: 'Burger House',
								image: '/images/home/restaurant_2.jpeg',
								rating: '4.5',
								cuisine: 'American',
								deliveryTime: '25-35 min',
							},
							{
								name: 'Sushi Master',
								image: '/images/home/restaurant_3.jpeg',
								rating: '4.9',
								cuisine: 'Japanese',
								deliveryTime: '35-45 min',
							},
						].map((restaurant) => (
							<Link
								key={restaurant.name}
								href={`/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`}
								className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
							>
								<div className="relative h-48">
									<Image
										src={restaurant.image}
										alt={restaurant.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-4">
									<h3 className="mb-2 text-xl font-semibold">
										{restaurant.name}
									</h3>
									<div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
										<LuStar className="h-4 w-4 fill-current text-yellow-400" />
										<span>{restaurant.rating}</span>
										<span>•</span>
										<span>{restaurant.cuisine}</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-gray-600">
										<LuClock4 className="h-4 w-4" />
										<span>{restaurant.deliveryTime}</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
