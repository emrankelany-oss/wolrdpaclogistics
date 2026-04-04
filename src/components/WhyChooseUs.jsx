'use client';

export default function WhyChooseUs() {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
            <div className="why-choose-section max-w-[1920px] mx-auto">
                <div className="why-choose-layout">

                    {/* Left Column - Heading + Stats */}
                    <div className="why-choose-left">
                        <h2>What Sets Us Apart</h2>
                        <p>World Pac Logistics is committed to delivering exceptional shipping solutions that keep your business moving forward.</p>
                        <div className="why-stats">
                            <div className="why-stat">
                                <span className="why-stat-number">50+</span>
                                <span className="why-stat-label">Countries Served</span>
                            </div>
                            <div className="why-stat-divider"></div>
                            <div className="why-stat">
                                <span className="why-stat-number">98%</span>
                                <span className="why-stat-label">On-Time Delivery</span>
                            </div>
                            <div className="why-stat-divider"></div>
                            <div className="why-stat">
                                <span className="why-stat-number">10K+</span>
                                <span className="why-stat-label">Shipments Completed</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Cards with concentric circles */}
                    <div className="why-choose-right">
                        {/* Decorative concentric circles */}
                        <div className="concentric-circles">
                            <div className="circle circle-1"></div>
                            <div className="circle circle-2"></div>
                            <div className="circle circle-3"></div>
                        </div>

                        {/* Cards 2x2 grid */}
                        <div className="why-cards-grid">
                            <div className="why-card">
                                <div className="why-card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M2 12h20"></path>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    </svg>
                                </div>
                                <h3>Global Reach</h3>
                                <p>Our extensive shipping network spans over 50 countries, connecting your business to markets worldwide.</p>
                            </div>

                            <div className="why-card">
                                <div className="why-card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                                <h3>Transparent Pricing</h3>
                                <p>No hidden fees or surprise charges. Get detailed, upfront quotes with full cost breakdowns.</p>
                            </div>

                            <div className="why-card">
                                <div className="why-card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 6v6l4 2"></path>
                                    </svg>
                                </div>
                                <h3>Reliable Timelines</h3>
                                <p>Precision scheduling with 98% on-time delivery to meet your deadlines without compromise.</p>
                            </div>

                            <div className="why-card">
                                <div className="why-card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <h3>Dedicated Support</h3>
                                <p>Your assigned logistics coordinator is available around the clock to handle inquiries and resolve issues.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
