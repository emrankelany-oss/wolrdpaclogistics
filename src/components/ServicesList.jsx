'use client';

import Link from 'next/link';

const servicesDetail = [
    {
        title: "RoRo Shipping Services",
        description: "RoRo (Roll On, Roll Off) is the safest and most cost-effective method for transporting vehicles overseas. Your vehicle is driven directly onto the ship and secured below deck, protected from the elements.",
        features: ["Safe & Enclosed", "Fastest Transit Times", "Cost-Effective"],
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Overseas Container Freight",
        description: "For goods that need extra protection or for shipping personal effects along with a vehicle. We offer 20ft and 40ft exclusive container services to major ports worldwide.",
        features: ["Exclusive Container Use", "Personal Effects Allowed", "Global Port Coverage"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Project & Break Bulk Cargo",
        description: "Specialized logistics for oversized, heavy, or non-containerized cargo. Our team of experts engineers safe lifting and stowage plans for your most complex shipments.",
        features: ["Heavy Lift Capable", "Custom Stowage Plans", "On-Site Supervision"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Inland Vehicle Transportation",
        description: "Seamless door-to-port or port-to-door transportation services. We utilize a network of trusted carriers to move your vehicle safely across the country.",
        features: ["Nationwide Coverage", "Open & Enclosed Carriers", "Real-Time Tracking"],
        image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1888&auto=format&fit=crop"
    },
    {
        title: "Heavy Equipment Transport",
        description: "Expert shipping for construction, agricultural, and industrial machinery. We handle all dismantling, washing, and documentation required for export.",
        features: ["Dismantling Services", "Customs Clearance", "Permit Handling"],
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Warehousing & Distribution",
        description: "Secure storage solutions at major port gateways. Our Vehicle Distribution Centers (VDC) maximize efficiency for consolidations and export preparation.",
        features: ["24/7 Security", "Inventory Management", "Bonded Facilities"],
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop"
    }
];

export default function ServicesList() {
    return (
        <section className="bg-white py-16 px-4 md:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-[1920px] mx-auto space-y-32">
                {servicesDetail.map((service, index) => (
                    <div
                        key={index}
                        className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute inset-0 bg-red-700/5 transform translate-x-4 translate-y-4 rounded-[40px] transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-[400px] object-cover transform transition-transform duration-700 hover:scale-105"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full lg:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-[#252728]">
                                {service.title}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-red-700 pl-6">
                                {service.description}
                            </p>

                            {/* Features List */}
                            <ul className="space-y-4 pt-4">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-gray-700 font-medium">
                                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <Link href="/contact-us" className="inline-flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider hover:gap-4 transition-all">
                                    Get Quote for {service.title.split(' ')[0]}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
