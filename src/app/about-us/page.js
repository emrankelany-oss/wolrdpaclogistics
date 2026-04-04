'use client';

import PageHeader from '@/components/PageHeader';

export default function AboutUsPage() {
    return (
        <main className="bg-white text-[#252728]">
            <PageHeader title="About Us" subtitle="Your Global Shipping Partner" />

            {/* Introduction: Our Story */}
            <section className="py-16 px-4 md:px-6 lg:px-8">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-block bg-red-50 text-red-700 font-bold px-4 py-2 rounded-full uppercase tracking-wider text-xs">
                            Our Story
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">
                            Building Bridges Across <br />
                            <span className="text-red-700">Oceans & Borders</span>
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Founded in 2010 with a vision to simplify the complexities of global trade, World Pac Logistics has evolved from a small freight forwarder into a comprehensive logistics powerhouse. We questioned the status quo of shipping—why it had to be opaque, slow, and complicated.
                            </p>
                            <p>
                                Today, we stand as a trusted partner for thousands of businesses and individuals, connecting markets through our robust network of air, sea, and land routes. Our journey is defined by a relentless pursuit of efficiency and a commitment to customer peace of mind.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Abstract Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gray-50 rounded-full z-0"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-50 rounded-full z-0"></div>

                        <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
                            <img
                                src="/images/hero1.png"
                                alt="World Pac Team"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-[#252728] text-white py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="max-w-[1920px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        <div>
                            <h3 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                <span className="w-12 h-1 bg-red-700 block"></span>
                                Our Mission
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                To empower global commerce by providing seamless, secure, and innovative logistics solutions. We strive to remove the friction from international trade, enabling our clients to focus on growth while we handle the complexities of transport.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                <span className="w-12 h-1 bg-red-700 block"></span>
                                Our Vision
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                To be the world's most customer-centric logistics company, recognized for our reliability, technological leadership, and sustainable practices that drive the industry forward.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-[1920px] mx-auto">
                    <div className="mb-12 text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">Values That Drive Us</h2>
                        <p className="text-gray-600 text-lg max-w-2xl">
                            Our culture is built on a foundation of integrity and excellence. These core values guide every shipment we handle and every decision we make.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-700 transition-colors duration-300">
                                <svg className="w-8 h-8 text-red-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Unwavering Reliability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We honor our commitments. When we say your cargo will be there, it will be there. Trust is our most valuable currency.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-700 transition-colors duration-300">
                                <svg className="w-8 h-8 text-red-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Speed & Agility</h3>
                            <p className="text-gray-600 leading-relaxed">
                                In a fast-moving world, we adapt quickly. Our agile processes ensure we can tackle unexpected challenges without slowing down.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-700 transition-colors duration-300">
                                <svg className="w-8 h-8 text-red-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Global Stewardship</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We care about the partners we work with and the communities we serve, ensuring sustainable and ethical practices worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Stamp / Certification (Subtle Trust Indicator) */}
            <section className="py-16 px-4 md:px-6 lg:px-8 border-t border-gray-100 bg-white text-center">
                <p className="text-gray-400 uppercase tracking-widest font-bold text-sm mb-6">Accredited & Trusted By Industry Leaders</p>
                <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for logos if we had them, using text for now or simple icons */}
                    <div className="text-2xl font-bold text-gray-300">ISO 9001</div>
                    <div className="text-2xl font-bold text-gray-300">IATA</div>
                    <div className="text-2xl font-bold text-gray-300">FIATA</div>
                    <div className="text-2xl font-bold text-gray-300">WCA</div>
                </div>
            </section>

        </main>
    );
}
