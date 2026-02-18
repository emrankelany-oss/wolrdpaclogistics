'use client';
import { useState } from 'react';

const faqs = [
    {
        question: "How can I track my shipment?",
        answer: "You can track your shipment instantly using our online tracking tool. simply enter your Bill of Lading (BOL) or container number to get real-time application updates."
    },
    {
        question: "What documents do I need for international shipping?",
        answer: "Typically, you will need a Commercial Invoice, Packing List, and Bill of Lading. Depending on the destination and cargo type, additional certificates of origin or permits may be required. Our team guides you through every step."
    },
    {
        question: "Do you offer cargo insurance?",
        answer: "Yes, we offer comprehensive cargo insurance options to protect your goods against loss or damage during transit, giving you peace of mind."
    },
    {
        question: "How are shipping rates calculated?",
        answer: "Rates are determined based on volume (CBM), weight, distance, and the mode of transport (Air, Sea, or Land). We provide transparent pricing with no hidden fees."
    },
    {
        question: "Can you handle hazardous materials?",
        answer: "Yes, we are certified to handle hazardous materials (HAZMAT). Our team ensures full compliance with international safety regulations for dangerous goods."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-[#252728]">
            <div className="max-w-[1400px] mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column - FAQ Content */}
                    <div>
                        <div className="mb-12 text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium uppercase tracking-wide drop-shadow-lg leading-[1.1] text-[#252728] mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Find answers to common questions about our logistics services and shipping processes.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border border-gray-200 rounded-2xl transition-all duration-300 ${openIndex === index ? 'bg-white shadow-lg' : 'bg-white hover:bg-gray-100'}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    >
                                        <span className={`text-lg font-bold transition-colors font-sans ${openIndex === index ? 'text-red-700' : 'text-[#252728]'}`}>
                                            {faq.question}
                                        </span>
                                        <span className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2 font-sans">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div className="relative h-full min-h-[500px] hidden lg:block">
                        <div className="sticky top-24">
                            <div className="relative">
                                {/* Image 1 - Top Left */}
                                <div className="relative z-10 w-[85%] rounded-[30px] overflow-hidden shadow-2xl border-4 border-white">
                                    <img
                                        src="/images/qa1.png"
                                        alt="Logistics Support Team"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                {/* Image 2 - Bottom Right Overlap */}
                                <div className="absolute top-[40%] right-0 z-20 w-[65%] rounded-[30px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.2)] border-4 border-white">
                                    <img
                                        src="/images/qa2.png"
                                        alt="Global Shipping Operations"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-700/10 rounded-full blur-3xl -z-10"></div>
                                <div className="absolute top-10 right-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
