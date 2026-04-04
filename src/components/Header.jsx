'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if we are on a specialized page (not home) to maybe force a background?
    // For now, consistent style: Fixed transparent/blur.

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact Us', path: '/contact-us' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-8'} px-4 md:px-6 lg:px-8 flex justify-center`}>
            <div className={`w-full max-w-[1920px] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md h-14' : 'bg-transparent h-16'} rounded-full px-8 flex items-center justify-between`}>

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img src={scrolled ? '/images/logo2.png' : '/images/logo.png'} alt="World Pac Logistics" className="h-20 w-auto object-contain transition-opacity duration-300" />
                </Link>

                {/* Centered Links */}
                <nav className={`hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`${scrolled ? 'text-gray-900' : 'text-white'} hover:text-red-700 transition-colors duration-300 relative group`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all ${pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                    ))}
                </nav>

                {/* Get Quote Button - Consistent CTA */}
                <Link href="/#quote" className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2 px-6 rounded-full uppercase tracking-wider shadow-md hover:scale-105 transition-all duration-300">
                    Get a Quote
                </Link>
            </div>
        </header>
    );
}
