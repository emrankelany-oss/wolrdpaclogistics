'use client';

import Link from 'next/link';

const services = [
    {
        title: "RoRo Shipping Services",
        description: "RoRo (Roll On, Roll Off) is the fastest and most efficient way to transport vehicles overseas. Cars are driven directly onto the vessel for safe, rapid transport.",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" // Large ship/cargo
    },
    {
        title: "Overseas Freight",
        description: "Reliable and cost-effective container shipping solutions for international cargo. We plan, coordinate, and execute all your overseas and cross-border shipping needs.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" // Container port
    },
    {
        title: "Break Bulk Shipment",
        description: "Specialized transportation for heavy, wide, or long cargo. Our professional team finds the most suitable equipment to handle your oversized cargo safely.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" // Freight/Boxes
    },
    {
        title: "Vehicle Transportation",
        description: "Trusted inland transportation for vehicles from plant to port or door-to-door. We provide hassle-free auto transport for exotic, antique, and standard vehicles.",
        image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1888&auto=format&fit=crop" // Car carrier/truck
    },
    {
        title: "Heavy Equipment Transport",
        description: "Specialized shipping for construction equipment, tractors, and large machinery. We handle the complexities of moving heavy industrial assets safely.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" // Excavator/Construction
    },
    {
        title: "Warehousing & Storage",
        description: "Secure Vehicle Distribution Centers (VDC) and storage solutions. We offer safe, monitored storage options for your cargo before or after shipment.",
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop" // Warehouse interior
    }
];

export default function ServicesSection() {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-white text-[#252728] relative z-10 -mt-10">
            <div className="max-w-[1920px] mx-auto">

                {/* Section Title */}
                {/* Section Title */}
                <div className="mb-12 text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">Solutions We Provide</h2>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        Tailored logistics solutions designed to streamline your operations and accelerate growth.
                    </p>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative h-[440px] w-full overflow-hidden rounded-[40px] shadow-lg hover:shadow-2xl cursor-pointer transition-shadow duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 h-full w-full">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                {/* Bottom gradient only - keeps image clear */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>

                            {/* Content - anchored at bottom */}
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{service.title}</h3>
                                <p className="text-gray-200/90 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {service.description}
                                </p>
                                <Link href="#" className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider hover:text-red-400 transition-colors duration-300">
                                    Learn more
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
