import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			{/* Newsletter Section */}
			<div className="bg-red-500">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<div className="mb-6 text-white md:mb-0">
							<h3 className="mb-2 text-2xl font-bold">
								Subscribe to Our Newsletter
							</h3>
							<p>
								Get the latest updates on new restaurants and exclusive offers
							</p>
						</div>
						<div className="flex w-full md:w-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 rounded-l-lg px-4 py-2 focus:outline-none md:w-64"
							/>
							<button className="rounded-r-lg bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* About Section */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">
							About DeliveryGo
						</h3>
						<p className="mb-4 text-sm leading-relaxed">
							We&apos;re on a mission to bring the best local restaurants right
							to to to your doorstep. Discover amazing food from the best local
							restaurants.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								<FaFacebook className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								<BsTwitterX className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								<FaInstagram className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								<FaYoutube className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="transition-colors hover:text-white"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="transition-colors hover:text-white"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="transition-colors hover:text-white"
								>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="transition-colors hover:text-white"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/faq"
									className="transition-colors hover:text-white"
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* Popular Categories */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">
							Popular Categories
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/category/pizza"
									className="transition-colors hover:text-white"
								>
									Pizza
								</Link>
							</li>
							<li>
								<Link
									href="/category/burgers"
									className="transition-colors hover:text-white"
								>
									Burgers
								</Link>
							</li>
							<li>
								<Link
									href="/category/sushi"
									className="transition-colors hover:text-white"
								>
									Sushi
								</Link>
							</li>
							<li>
								<Link
									href="/category/desserts"
									className="transition-colors hover:text-white"
								>
									Desserts
								</Link>
							</li>
							<li>
								<Link
									href="/category/drinks"
									className="transition-colors hover:text-white"
								>
									Drinks
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">
							Contact Info
						</h3>
						<ul className="space-y-4">
							<li className="flex items-start">
								<LuMapPin className="mr-3 mt-0.5 h-5 w-5" />
								<span>123 Food Street, Cuisine City, FC 12345</span>
							</li>
							<li className="flex items-center">
								<LuPhone className="mr-3 h-5 w-5" />
								<span>+1 (555) 123-4567</span>
							</li>
							<li className="flex items-center">
								<LuMail className="mr-3 h-5 w-5" />
								<span>support@foodiehub.com</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 border-t border-gray-800 pt-8">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<p className="mb-4 text-sm md:mb-0">
							© {new Date().getFullYear()} DeliveryGo. All rights reserved.
						</p>
						<div className="flex space-x-6">
							<Link
								href="/terms"
								className="text-sm transition-colors hover:text-white"
							>
								Terms
							</Link>
							<Link
								href="/privacy"
								className="text-sm transition-colors hover:text-white"
							>
								Privacy
							</Link>
							<Link
								href="/cookies"
								className="text-sm transition-colors hover:text-white"
							>
								Cookies
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
