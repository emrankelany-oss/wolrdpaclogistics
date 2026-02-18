'use client';

export default function ScheduleForm() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-100">
            <h3 className="text-3xl font-bold text-[#252728] mb-6 leading-tight">
                Schedule a free <br /> consultation
            </h3>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Topic</label>
                    <div className="relative">
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all text-gray-400 text-sm appearance-none bg-white">
                            <option>Select topic</option>
                            <option>Freight Forwarding</option>
                            <option>Warehousing</option>
                            <option>Customs Clearance</option>
                            <option>Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        placeholder="Enter detail message"
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm resize-none"
                    ></textarea>
                </div>

                <button
                    type="button"
                    className="w-full bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-4 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.5)] hover:scale-105 transition-all uppercase tracking-wider mt-2"
                >
                    Book a Free Consultation
                </button>
            </form>
        </div>
    );
}
