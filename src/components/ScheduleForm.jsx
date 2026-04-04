'use client';

export default function ScheduleForm() {
    return (
        <div className="bg-white p-8 rounded-[40px] shadow-2xl max-w-md w-full border border-gray-100">
            <h3 className="text-3xl font-medium text-[#252728] mb-6 leading-tight">
                Start Your Shipment
            </h3>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">From</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all text-gray-400 text-sm appearance-none">
                                <option>Select country</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Germany</option>
                                <option>France</option>
                                <option>China</option>
                                <option>Japan</option>
                                <option>India</option>
                                <option>Australia</option>
                                <option>Brazil</option>
                                <option>UAE</option>
                                <option>South Africa</option>
                                <option>Mexico</option>
                                <option>South Korea</option>
                                <option>Saudi Arabia</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">To</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all text-gray-400 text-sm appearance-none">
                                <option>Select country</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Germany</option>
                                <option>France</option>
                                <option>China</option>
                                <option>Japan</option>
                                <option>India</option>
                                <option>Australia</option>
                                <option>Brazil</option>
                                <option>UAE</option>
                                <option>South Africa</option>
                                <option>Mexico</option>
                                <option>South Korea</option>
                                <option>Saudi Arabia</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        placeholder="Enter detail message"
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition-all placeholder:text-gray-400 text-sm resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-700 hover:bg-white text-white hover:text-red-700 border-2 border-transparent hover:border-red-700 text-xs font-bold py-4 rounded-full shadow-none hover:scale-105 transition-all duration-300 uppercase tracking-wider mt-2 cursor-pointer"
                >
                    Start Shipment
                </button>
            </form>
        </div>
    );
}
