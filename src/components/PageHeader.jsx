'use client';

export default function PageHeader({ title, subtitle }) {
    return (
        <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-[#252728] overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#252728] via-[#252728]/90 to-[#252728]/80 z-10"></div>
                <img
                    src="/images/hero2.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            <div className="relative z-10 text-center px-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide drop-shadow-lg leading-[1.1]">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-red-500 font-medium uppercase tracking-widest text-sm md:text-base">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Decorative bottom curve matching home page style */}
            <div className="absolute -bottom-1 left-0 w-full z-20 leading-none">
                <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path fill="#ffffff" fillOpacity="1" d="M0,100 L0,100 L320,100 C380,100 420,20 500,20 L940,20 C1020,20 1060,100 1120,100 L1440,100 L1440,320 L0,320 Z"></path>
                </svg>
            </div>
        </div>
    );
}
