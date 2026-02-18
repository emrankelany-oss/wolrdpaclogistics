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
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-[#252728] relative z-10 -mt-10">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Title */}
                {/* Section Title */}
                <div className="mb-12 text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium uppercase tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">Our Services</h2>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        Tailored logistics solutions designed to streamline your operations and accelerate growth.
                    </p>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative h-[340px] w-full overflow-hidden rounded-[40px] shadow-lg cursor-pointer"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 h-full w-full">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                {/* Overlay - Always present but gets darker/gradient shifts on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full transition-all duration-500">

                                {/* Title and initial view */}
                                <div className="transform transition-transform duration-500 ease-out translate-y-[140px] group-hover:translate-y-0">
                                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{service.title}</h3>

                                    {/* Description and Button (Revealed on hover) */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <p className="text-gray-200 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {service.description}
                                        </p>

                                        <Link href="#" className="inline-block bg-red-700 text-white text-xs font-bold py-3.5 px-8 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.5)] hover:bg-red-800 hover:scale-105 transition-all uppercase tracking-wider">
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
