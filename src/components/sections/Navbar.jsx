'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navbar({ transparent }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !transparent ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="WorldPac Logistics" className="h-8" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'About Us', path: '/about-us' },
            { name: 'Contact Us', path: '/contact-us' },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                scrolled || !transparent ? 'text-gray-700 hover:text-red-700' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
