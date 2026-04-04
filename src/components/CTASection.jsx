'use client';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
            <div className="max-w-[1920px] mx-auto">

                <div
                    className="relative rounded-[40px] overflow-hidden px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 min-h-[460px] md:min-h-[500px] lg:min-h-[540px] shadow-[0_8px_60px_rgba(0,0,0,0.25)]"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(8,7,5,0.85) 0%, rgba(8,7,5,0.72) 40%, rgba(8,7,5,0.45) 100%), url('/images/cta3.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >

                    {/* Content */}
                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Left - Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-white mb-4">
                                Ready to Move Your Cargo <br className="hidden md:block" /> With Confidence?
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Partner with a logistics team that delivers on every promise. From port to door, we handle the complexity so you can focus on growth.
                            </p>

                            {/* Buttons */}
                            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/contact-us"
                                    className="bg-red-700 hover:bg-white text-white hover:text-red-700 border-2 border-transparent hover:border-red-700 text-xs font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300 uppercase tracking-wider cursor-pointer"
                                >
                                    Request a Quote
                                </Link>
                            </div>

                            {/* Micro-proof points */}
                            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 justify-center lg:justify-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-700"></div>
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Response within 24 hours</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-700"></div>
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Dedicated account support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-700"></div>
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">End-to-end logistics</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section>
    );
}
