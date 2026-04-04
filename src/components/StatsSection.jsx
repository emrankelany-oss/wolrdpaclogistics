'use client';

const stats = [
    {
        value: "15+",
        label: "Years of Experience",
        description: "Delivering excellence in global logistics since 2010."
    },
    {
        value: "12k+",
        label: "Successful Shipments",
        description: "From small parcels to heavy machinery, we've moved it all."
    },
    {
        value: "50+",
        label: "Countries Served",
        description: "A vast global network ensuring your cargo reaches any destination."
    },
    {
        value: "98%",
        label: "On-Time Delivery",
        description: "Commitment to punctuality and reliability for every client."
    }
];

export default function StatsSection() {
    return (
        <section className="bg-white py-16 px-4 md:px-6 lg:px-8 relative z-0">

            <div className="max-w-[1920px] mx-auto">

                {/* Visual Separator */}
                <div className="w-20 h-1 bg-red-700 mb-12 rounded-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-100 pb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="group cursor-default">
                            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-700 to-red-900 mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                                {stat.value}
                            </h3>
                            <p className="text-[#252728] font-bold uppercase tracking-wider text-sm mb-3">
                                {stat.label}
                            </p>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
