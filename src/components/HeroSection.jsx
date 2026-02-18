'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ScheduleForm from './ScheduleForm';

export default function HeroSection() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col font-sans bg-[#252728]">

            {/* Background Image - Truck at Night with Red Accents */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#252728]/90 via-[#252728]/40 to-[#252728]/20 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#252728] via-transparent to-transparent z-10"></div>

                <img
                    src="/images/hero2.png"
                    alt="Smart Logistics Truck"
                    className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
                />
            </div>

            {/* Floating Navigation */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'} px-4 flex justify-center`}>
                <div className={`w-full max-w-[1400px] transition-all duration-300 ${scrolled ? 'bg-[#252728]/80 backdrop-blur-md h-14' : 'bg-white/5 backdrop-blur-sm border border-white/10 h-16'} rounded-full px-6 flex items-center justify-between shadow-lg`}>

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.png" alt="MOVIX Logo" className="h-32 w-auto object-contain" />
                    </Link>

                    {/* Centered Links */}
                    <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium text-white uppercase tracking-widest">
                        {['Home', 'Shipping', 'Tracking', 'Support', 'Career'].map((item) => (
                            <Link key={item} href="#" className="hover:text-white transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Contact Button */}
                    <Link href="#" className="bg-red-700 hover:bg-red-800 text-white text-[10px] font-bold py-2 px-6 rounded-full uppercase tracking-wider transition-all shadow-md">
                        Contact Us
                    </Link>
                </div>
            </header>

            {/* Hero Content */}
            <main className="relative z-10 flex-grow flex items-center px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl w-full translate-y-10 animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-6 tracking-wide drop-shadow-lg">
                        SMART LOGISTICS FOR <br />
                        A MOVING WORLD.
                    </h1>

                    <p className="text-gray-200 text-sm md:text-base font-light mb-10 max-w-lg leading-relaxed drop-shadow-md">
                        From warehouse to doorstep streamline your logistics with tech-powered solutions.
                    </p>

                    <Link href="#" className="inline-block bg-red-700 text-white text-xs font-bold py-3.5 px-8 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.5)] hover:bg-red-800 hover:scale-105 transition-all uppercase tracking-wider">
                        Get a Quote
                    </Link>
                </div>
            </main>

            {/* Schedule Form - Absolute Positioned to Overlap */}
            <div className="hidden lg:block absolute right-6 md:right-12 lg:right-24 bottom-[-80px] z-30">
                <ScheduleForm />
            </div>

            {/* Curved Bottom Separator */}
            <div className="absolute -bottom-1 left-0 w-full z-20 leading-none">
                {/* This SVG creates the specific "white card rising" effect from the screenshot */}
                <svg className="relative block w-full h-[80px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path fill="#ffffff" fillOpacity="1" d="M0,120 L0,120 L320,120 C380,120 420,40 500,40 L940,40 C1020,40 1060,120 1120,120 L1440,120 L1440,320 L0,320 Z"></path>
                </svg>
            </div>

        </div>
    );
}
