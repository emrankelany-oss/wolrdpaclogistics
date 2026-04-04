'use client';
import PageHeader from '@/components/PageHeader';

export default function ContactUsPage() {
    return (
        <main className="bg-white">
            <PageHeader title="Contact Us" subtitle="Get in Touch With Our Team" />

            <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-[1920px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">Let's Discuss Your Logistics</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mb-12">
                                Have a question about a shipment or need a custom quote? Our team is ready to help you optimize your supply chain.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#252728] mb-1">Our Location</h4>
                                        <p className="text-gray-600">123 Logistics Way, Suite 400<br />Port City, NJ 08000</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#252728] mb-1">Email Us</h4>
                                        <p className="text-gray-600">support@worldpaclogistics.com<br />info@worldpaclogistics.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#252728] mb-1">Call Us</h4>
                                        <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri, 9am - 6pm EST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-10 border border-gray-100">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all"></textarea>
                                </div>

                                <button type="button" className="w-full bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-4 rounded-full shadow-md hover:scale-105 transition-all duration-300 uppercase tracking-wider cursor-pointer">
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}
