'use client';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Dark Overlay for readability */}
                <img
                    src="/images/cta.png"
                    alt="CTA Background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">

                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium uppercase tracking-wide drop-shadow-lg leading-[1.1] text-white mb-6">
                        Ready to Streamline <br /> Your Logistics?
                    </h2>
                    <p className="text-gray-200 text-lg leading-relaxed">
                        Join thousands of businesses that trust World Pac Logistics for their global shipping needs. efficient, reliable, and tailored to you.
                    </p>
                </div>

                <div>
                    <Link href="#" className="inline-block bg-red-700 hover:bg-red-800 text-white text-sm font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.5)] hover:scale-105 transition-all uppercase tracking-wider">
                        Get a Quote
                    </Link>
                </div>
            </div>
        </section>
    );
}
