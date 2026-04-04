'use client';
import { useState } from 'react';

const testimonials = [
    {
        name: "Marcus Chen",
        role: "Supply Chain Director, TechFlow Inc.",
        quote: "World Pac Logistics transformed our international shipping operations. Their real-time tracking and proactive communication kept us informed every step of the way.",
        initials: "MC"
    },
    {
        name: "Sarah Mitchell",
        role: "Operations Manager, Atlas Industries",
        quote: "Exceptional service and on-time deliveries every time. The tracking system is highly accurate, and customer support is always responsive. Highly recommend for hassle-free logistics.",
        initials: "SM"
    },
    {
        name: "David Okafor",
        role: "CEO, Meridian Trade Co.",
        quote: "We switched to World Pac for our heavy equipment shipping and the difference was immediate. Professional handling, competitive rates, and zero damage across all shipments.",
        initials: "DO"
    },
    {
        name: "Elena Rodriguez",
        role: "Procurement Lead, Coastal Exports",
        quote: "A seamless experience from start to finish. Their customs clearance expertise saved us weeks of delays. The team goes above and beyond on every shipment.",
        initials: "ER"
    },
    {
        name: "James Wright",
        role: "Logistics Coordinator, Pacific Motors",
        quote: "Outstanding vehicle transport service. Our fleet of 50 vehicles was shipped internationally without a single issue. Their RoRo expertise is unmatched in the industry.",
        initials: "JW"
    }
];

const StarIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
);

const Stars = () => (
    <div className="stars">
        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
    </div>
);

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (activeIndex + 1) % testimonials.length;

    const prevItem = testimonials[prevIndex];
    const activeItem = testimonials[activeIndex];
    const nextItem = testimonials[nextIndex];

    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
            <div className="testimonials-section max-w-[1920px] mx-auto">

                <div className="section-header">
                    <h2>Trusted by Businesses</h2>
                    <p>We deliver reliability with cutting-edge technology, real-time tracking, and a commitment to on-time performance, ensuring seamless logistics solutions.</p>
                </div>

                <div className="cards-container" key={activeIndex}>

                    {/* Left Card (Faded) */}
                    <div className="card faded">
                        <Stars />
                        <p className="quote-text">&ldquo;{prevItem.quote}&rdquo;</p>
                        <div className="author">
                            <div className="author-avatar">{prevItem.initials}</div>
                            <div className="author-details">
                                <h4>{prevItem.name}</h4>
                                <p>{prevItem.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Center Card (Active) */}
                    <div className="card active">
                        <div className="quote-badge">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>
                        <Stars />
                        <p className="quote-text">&ldquo;{activeItem.quote}&rdquo;</p>
                        <div className="author">
                            <div className="author-avatar">{activeItem.initials}</div>
                            <div className="author-details">
                                <h4>{activeItem.name}</h4>
                                <p>{activeItem.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Card (Faded) */}
                    <div className="card faded">
                        <Stars />
                        <p className="quote-text">&ldquo;{nextItem.quote}&rdquo;</p>
                        <div className="author">
                            <div className="author-avatar">{nextItem.initials}</div>
                            <div className="author-details">
                                <h4>{nextItem.name}</h4>
                                <p>{nextItem.role}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="controls">
                    <button type="button" className="btn btn-prev" onClick={handlePrev} aria-label="Previous testimonial">
                        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                    </button>
                    <button type="button" className="btn btn-next" onClick={handleNext} aria-label="Next testimonial">
                        <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
                    </button>
                </div>

            </div>
        </section>
    );
}
