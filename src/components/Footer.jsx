'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white text-gray-600 pt-24 pb-8 font-sans border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* About Column */}
                    <div className="space-y-6">
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-6">About Us</h4>
                        <p className="text-gray-500 text-sm leading-7">
                            World Pac Logistics provides reliable, efficient, and secure global shipping solutions. We turn logistical challenges into competitive advantages for your business.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {['facebook', 'twitter', 'linkedin'].map((social) => (
                                <Link key={social} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-700 hover:text-white transition-all text-gray-400 group">
                                    <span className="sr-only">{social}</span>
                                    {/* Generic Social Icon */}
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" fillOpacity="0.2" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Company', 'Our Services', 'Get a Quote', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-red-700 hover:translate-x-1.5 transition-all duration-300 text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-red-700 rounded-full"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-6">Our Services</h4>
                        <ul className="space-y-3">
                            {['RoRo Shipping', 'Overseas Freight', 'Break Bulk', 'Vehicle Transport', 'Warehousing'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-red-700 hover:translate-x-1.5 transition-all duration-300 text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-red-700 rounded-full"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-6">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="mt-1 w-8 h-8 rounded bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 group-hover:bg-red-700 group-hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <span className="block text-gray-900 font-medium mb-1">Headquarters</span>
                                    <p className="text-gray-500">186 Paterson Ave Suite# 305<br />East Rutherford, NJ 07073</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="mt-1 w-8 h-8 rounded bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 group-hover:bg-red-700 group-hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <span className="block text-gray-900 font-medium mb-1">Phone Number</span>
                                    <p className="text-gray-500">+1 (201) 250 - 2509</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="mt-1 w-8 h-8 rounded bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600 group-hover:bg-red-700 group-hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <span className="block text-gray-900 font-medium mb-1">Email Address</span>
                                    <p className="text-gray-500">info@worldpaclogistics.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} World Pac Logistics. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-red-700 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-red-700 transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-red-700 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
