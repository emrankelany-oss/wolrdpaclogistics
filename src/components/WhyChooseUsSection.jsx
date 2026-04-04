'use client';

const pillars = [
    {
        title: "Global Network",
        description: "We work with a wide array of quality and trusted business partners to extend our services throughout the US and ship to almost any country.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        stat: "50+",
        statLabel: "Countries"
    },
    {
        title: "Operational Precision",
        description: "Our industry knowledge ensures seamless execution. We plan, coordinate, and execute every shipment with exact timing and care.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        stat: "98%",
        statLabel: "On-Time"
    },
    {
        title: "Competitive Rates",
        description: "We offer some of the most competitive rates in the industry without compromising on quality or speed.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        stat: "30%",
        statLabel: "Avg. Savings"
    },
    {
        title: "Dedicated Support",
        description: "Going above and beyond the call of duty is our internal expectation. Our team is here to support you at every step.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        stat: "24/7",
        statLabel: "Availability"
    }
];

export default function WhyChooseUsSection() {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-white text-[#252728]">
            <div className="max-w-[1920px] mx-auto">

                {/* Section Header */}
                <div className="mb-12 text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">Why Choose Us</h2>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        We don't just move cargo; we move businesses forward. Here is why industry leaders trust us with their most critical shipments.
                    </p>
                </div>

                {/* Pillar Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden flex flex-col"
                        >
                            {/* Top red accent line */}
                            <div className="absolute top-0 left-8 right-8 h-[3px] bg-red-700 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-700 mb-6 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                                {pillar.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-[#252728] mb-3 tracking-wide">{pillar.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                                {pillar.description}
                            </p>

                            {/* Inline stat - always pinned to bottom */}
                            <div className="pt-6 mt-6 border-t border-gray-100 flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-red-700">{pillar.stat}</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">{pillar.statLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
