'use client';

export default function WhyChooseUsSection() {
    const pillars = [
        {
            title: "Global Network",
            description: "We work with a wide array of quality and trusted business partners to extend our services throughout the US and ship to almost any country.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Operational Precision",
            description: "Our industry knowledge ensures seamless execution. We plan, coordinate, and execute every shipment with exact timing and care.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Competitive Rates",
            description: "We offer some of the most competitive rates in the industry without compromising on quality or speed.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Dedicated Support",
            description: "Going above and beyond the call of duty is our internal expectation. Our team is here to support you at every step.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-[#252728]">
            <div className="max-w-[1400px] mx-auto">

                <div className="mb-12 text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium uppercase tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">Why Choose Us</h2>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        We don't just move cargo; we move businesses forward. Here is why industry leaders trust us with their most critical shipments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-6 rounded-full bg-white shadow-xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl border border-gray-100">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-[#252728] uppercase tracking-wider">{pillar.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
