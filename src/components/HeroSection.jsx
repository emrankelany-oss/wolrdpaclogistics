'use client';

import Link from 'next/link';
import ScheduleForm from './ScheduleForm';

export default function HeroSection() {
    // Scroll state logic moved to Header.jsx

    return (
        <div className="px-4 md:px-6 lg:px-8 py-6 relative z-20">
            <div className="relative min-h-screen flex flex-col bg-[#252728] rounded-[40px] overflow-hidden">

                {/* Background Image - Truck at Night with Red Accents */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#252728]/90 via-[#252728]/40 to-[#252728]/20 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#252728] via-transparent to-transparent z-10"></div>

                    <img
                        src="/images/hero2.png"
                        alt="Smart Logistics Truck"
                        className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
                    />
                </div>

                {/* Hero Content */}
                <main className="relative z-10 flex-grow flex items-center px-4 md:px-6 lg:px-8">
                    <div className="max-w-4xl w-full translate-y-10 animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-3 tracking-wide drop-shadow-lg">
                            SMART LOGISTICS FOR <br />
                            A MOVING WORLD.
                        </h1>

                        <p className="text-gray-200 text-sm md:text-base font-light mb-12 max-w-lg leading-relaxed drop-shadow-md">
                            From warehouse to doorstep streamline your logistics with tech-powered solutions.
                        </p>

                        <Link href="#" className="inline-block bg-red-700 text-white text-xs font-bold py-3.5 px-8 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.5)] hover:bg-red-800 hover:scale-105 transition-all uppercase tracking-wider">
                            Get a Quote
                        </Link>
                    </div>
                </main>

            </div>

            {/* Schedule Form - Outside overflow-hidden so it's not clipped */}
            <div className="hidden lg:block absolute right-8 lg:right-12 bottom-[-80px] z-30">
                <ScheduleForm />
            </div>
        </div>
    );
}
