'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ARTICLE_TOPIC = 'Freight Forwarding';
const ARTICLE_FILE =
  'src/app/articles/freight-forwarding-explained/ArticleClient.js';

/* ─────────── TOC DATA ─────────── */
const tocItems = [
  { id: 'section-1', label: 'The $336B Industry' },
  { id: 'section-2', label: 'What Is Freight Forwarding?' },
  { id: 'section-3', label: 'Types of Services' },
  { id: 'section-4', label: 'The Process: Step by Step' },
  { id: 'section-5', label: 'Forwarder vs. Broker vs. Carrier' },
  { id: 'section-6', label: 'Why It Matters for Your Business' },
  { id: 'section-7', label: 'Key Documents to Know' },
  { id: 'section-8', label: 'Global Reach' },
  { id: 'section-9', label: 'Frequently Asked Questions' },
  { id: 'section-10', label: 'Key Takeaways' },
];

/* ─────────── EDIT SYSTEM HELPERS ─────────── */
function buildEditPrompt(sectionId, sectionType, sectionRole, sectionPurpose, sectionHeading, userInstruction) {
  return `SECTION_EDIT:\nUse the article-engine skill to update section ${sectionId}.\n\nTopic: ${ARTICLE_TOPIC}\nArticle file: ${ARTICLE_FILE}\nSection ID: ${sectionId}\nSection type: ${sectionType}\nSection role: ${sectionRole}\nSection purpose: ${sectionPurpose}\nCurrent section heading: ${sectionHeading}\n\nUser requested change: ${userInstruction}\n\nRULES:\n- Update only this section unless minimal surrounding adjustment needed\n- Preserve topic domain integrity and page style\n- If heading changes, update sidebar TOC entry to match\n- Maintain data-section-id, data-section-type, data-section-role attributes`;
}

/* ─────────── IMAGE PLACEHOLDER COMPONENT ─────────── */
function ImagePlaceholder({ alt, aspect = '4/3' }) {
  return (
    <div
      className={`my-8 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center`}
      style={{ aspectRatio: aspect }}
    >
      <div className="text-center text-gray-400 px-8">
        <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
        <p className="text-sm font-medium">{alt}</p>
      </div>
    </div>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function ArticleClient() {
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editInstruction, setEditInstruction] = useState('');
  const [editStatus, setEditStatus] = useState(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState('');
  const [faqOpen, setFaqOpen] = useState(null);
  const sidebarRef = useRef(null);

  /* Intersection observer for active TOC highlight */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Edit overlay handlers */
  function openEditOverlay(sectionEl) {
    const id = sectionEl.getAttribute('data-section-id');
    const type = sectionEl.getAttribute('data-section-type');
    const role = sectionEl.getAttribute('data-section-role');
    const heading = sectionEl.getAttribute('data-section-heading');
    const purpose = sectionEl.getAttribute('data-section-purpose');
    setEditTarget({ id, type, role, heading, purpose });
    setEditInstruction('');
    setEditStatus(null);
    setEditOverlayOpen(true);
  }

  async function handleApplyEdit() {
    if (!editInstruction.trim() || !editTarget) return;
    const prompt = buildEditPrompt(
      editTarget.id,
      editTarget.type,
      editTarget.role,
      editTarget.purpose,
      editTarget.heading,
      editInstruction
    );
    try {
      await navigator.clipboard.writeText(prompt);
      setEditStatus({ type: 'success', message: 'Edit prompt copied! Type /apply-edit in Claude Code.' });
    } catch {
      setEditStatus({ type: 'fallback', prompt });
    }
  }

  /* ─────────── FAQ DATA ─────────── */
  const faqItems = [
    {
      q: 'How much does freight forwarding cost?',
      a: 'Freight forwarding costs vary widely based on shipment size, mode of transport, distance, and service level. Ocean freight for a 40-foot container from Asia to the US West Coast typically ranges from $2,200 to $9,500. Air freight costs more per kilogram but is faster. Most forwarders provide free quotes and can break down costs for customs duties, insurance, warehousing, and documentation fees.',
    },
    {
      q: 'Can freight forwarders handle small shipments?',
      a: 'Yes. Freight forwarders specialize in Less-than-Container Load (LCL) shipments where your cargo shares container space with other shippers. This is ideal for small and mid-size businesses that do not fill an entire container. LCL rates are calculated per cubic meter, making international shipping accessible even for modest volumes.',
    },
    {
      q: 'How long does international freight forwarding take?',
      a: 'Transit times depend on the mode. Ocean freight from China to the US West Coast takes 14 to 25 days. Air freight covers the same route in 3 to 7 days. Ground transport within North America takes 2 to 10 days depending on distance. Add 2 to 5 business days for customs clearance at each border. Your forwarder will provide estimated timelines during the booking process.',
    },
    {
      q: 'What is the difference between FCL and LCL shipping?',
      a: 'FCL (Full Container Load) means you book an entire container exclusively for your cargo, whether it is a 20-foot or 40-foot unit. LCL (Less-than-Container Load) means your goods share container space with other shippers. FCL is more cost-effective for large shipments and offers faster transit since there is no consolidation. LCL is better for smaller volumes but may have longer transit times due to consolidation and deconsolidation at each end.',
    },
    {
      q: 'How do I choose the right freight forwarder?',
      a: 'Look for a forwarder with experience in your specific trade lanes and cargo type. Verify they hold proper licensing (FMC license for ocean, IATA certification for air). Check their network of agents in your destination countries. Ask about their technology platform for tracking and documentation. Request references from businesses similar to yours. Finally, compare quotes from at least three forwarders before committing.',
    },
    {
      q: 'What happens if my shipment is delayed?',
      a: 'Delays can occur due to weather, port congestion, customs holds, or documentation errors. A good freight forwarder proactively monitors shipments and notifies you of delays before they impact your schedule. They will also work to reroute cargo, expedite customs clearance, or arrange alternative transport. Cargo insurance can cover financial losses from significant delays. Ask your forwarder about their contingency planning before booking.',
    },
    {
      q: 'Do I need a freight forwarder if I only ship domestically?',
      a: 'While freight forwarders are most valuable for international shipping, they can also optimize domestic logistics. They have bulk rate agreements with carriers that individual shippers cannot access, and they handle complex multi-modal routing. For straightforward point-to-point domestic shipments, a freight broker may be sufficient. For anything involving warehousing, multiple carriers, or cross-border movement, a full-service forwarder adds significant value.',
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* ═══════ SECTION 0: HERO ═══════ */}
      <section
        id="section-0"
        className="article-section relative w-full min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden rounded-b-[2rem]"
        data-section-id="section-0"
        data-section-type="hero"
        data-section-role="introduction"
        data-section-heading="Freight Forwarding Explained: What It Is, How It Works, and Why It Matters"
        data-section-purpose="Set visual tone and introduce the article topic"
      >
        <button className="section-edit-trigger" data-edit-section="section-0" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
        <div className="absolute inset-0 bg-gradient-to-br from-[#252728] via-[#1a1d1e] to-[#252728]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(185,28,28,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 pt-32 w-full">
          <nav className="text-sm text-gray-300 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-white transition-colors">Articles</Link>
            <span>/</span>
            <span className="text-white">Freight Forwarding</span>
          </nav>
          <span className="inline-block bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Freight &amp; Shipping
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Freight Forwarding Explained: What It Is, How It Works, and Why It Matters
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              World Pac Logistics
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              April 2026
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              13 min read
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ TWO-COLUMN LAYOUT ═══════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile TOC */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-sm font-semibold text-[#252728]"
          >
            Table of Contents
            <svg className={`w-5 h-5 transition-transform ${tocOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {tocOpen && (
            <nav className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setTocOpen(false)}
                  className="block py-1.5 px-3 text-sm text-gray-600 hover:text-red-700 hover:bg-white rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* ─── MAIN CONTENT COLUMN ─── */}
          <div className="min-w-0">

            {/* ═══════ SECTION 1: INTRODUCTION / STAT-QUOTE HYBRID ═══════ */}
            <section
              id="section-1"
              className="article-section mb-16"
              data-section-id="section-1"
              data-section-type="bp-stat-quote-hybrid"
              data-section-role="introduction"
              data-section-heading="The $336B Industry"
              data-section-purpose="Hook readers with market scale and set article expectations"
            >
              <button className="section-edit-trigger" data-edit-section="section-1" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>

              {/* Stat callout */}
              <div className="bg-[#fef2f2] border border-red-200 rounded-2xl p-6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-4xl md:text-5xl font-extrabold text-red-700">$336.61B</div>
                  <div>
                    <p className="text-lg font-semibold text-[#252728]">Global freight forwarding market size in 2026</p>
                    <p className="text-sm text-gray-500 mt-1">Projected to reach $536.51B by 2034 at a 6% CAGR</p>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-red-700 pl-5 italic text-lg text-gray-600 mb-6">
                &ldquo;Behind every product on every shelf sits a freight forwarder who made the journey possible.&rdquo;
              </blockquote>

              <div className="prose-article space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Every year, billions of tons of cargo cross oceans, fly through airways, and roll across highways to reach businesses and consumers worldwide. At the center of this massive operation is the <strong>freight forwarder</strong> -- the strategic intermediary that orchestrates the movement of goods across borders, modes of transport, and regulatory frameworks.
                </p>
                <p>
                  Whether you are a small business importing materials for the first time or a multinational corporation managing a global supply chain, understanding how freight forwarding works is essential. This guide breaks down everything you need to know: what freight forwarders actually do, how the process works from booking to delivery, the types of services available, the documents involved, and how to choose the right partner for your shipping needs.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 2: WHAT IS FREIGHT FORWARDING? ═══════ */}
            <section
              id="section-2"
              className="article-section mb-16"
              data-section-id="section-2"
              data-section-type="bp-image-process"
              data-section-role="foundation"
              data-section-heading="What Is Freight Forwarding?"
              data-section-purpose="Define freight forwarding and outline the forwarder's core functions"
            >
              <button className="section-edit-trigger" data-edit-section="section-2" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                What Is Freight Forwarding?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Image placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center text-gray-400 px-8">
                    <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    <p className="text-sm font-medium">Freight Forwarder Coordinating Global Shipments</p>
                  </div>
                </div>

                {/* 4-step explanation */}
                <div className="space-y-5">
                  <p className="text-gray-700 leading-relaxed">
                    A freight forwarder is a specialized logistics company that arranges the transportation of goods on behalf of shippers. They do not typically own the ships, planes, or trucks -- instead, they act as expert intermediaries who negotiate rates, book cargo space, manage documentation, and coordinate multi-modal transport from origin to destination.
                  </p>
                  {[
                    { step: '01', title: 'Assess Needs', desc: 'Evaluate your cargo type, volume, destination, and timeline to determine the optimal shipping strategy.' },
                    { step: '02', title: 'Select Carriers', desc: 'Leverage established relationships with ocean lines, airlines, and trucking companies to secure competitive rates.' },
                    { step: '03', title: 'Handle Documentation', desc: 'Prepare and process all required shipping documents, customs declarations, and compliance paperwork.' },
                    { step: '04', title: 'Manage Transport', desc: 'Coordinate pickup, transit, customs clearance, and final delivery -- tracking every step in real time.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-700 rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#252728] text-sm">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mt-8">
                <p>
                  Think of a freight forwarder as the travel agent of the cargo world. Just as a travel agent books flights, hotels, and transfers so you can focus on your trip, a freight forwarder books carriers, warehouses, and customs services so you can focus on your business. The difference is that the stakes are much higher -- a misrouted container or a missing customs form can cost thousands of dollars and weeks of delay.
                </p>
                <p>
                  Modern freight forwarders go far beyond simple booking. They provide <strong>supply chain consulting</strong>, <strong>cargo insurance</strong>, <strong>trade compliance advisory</strong>, and <strong>real-time shipment visibility</strong> through digital platforms. Digital platforms alone have reduced booking time by 30% and improved shipment visibility by 25% over the past three years.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 3: TYPES OF SERVICES ═══════ */}
            <section
              id="section-3"
              className="article-section mb-16"
              data-section-id="section-3"
              data-section-type="bp-service-type-cards"
              data-section-role="service-overview"
              data-section-heading="Types of Freight Forwarding Services"
              data-section-purpose="Present the range of services freight forwarders offer"
            >
              <button className="section-edit-trigger" data-edit-section="section-3" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Types of Freight Forwarding Services
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Freight forwarders offer a comprehensive suite of services tailored to different cargo types, trade routes, and business needs. Here are the six core service categories.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    ),
                    title: 'Ocean Freight',
                    desc: 'The backbone of global trade, carrying 80% of the world\'s merchandise by volume. Ideal for large, heavy, or non-urgent shipments.',
                    features: ['FCL and LCL options', 'Reefer containers for perishables', 'Project cargo and breakbulk'],
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                    ),
                    title: 'Air Freight',
                    desc: 'The fastest mode for international shipping, critical for time-sensitive, high-value, or perishable goods that cannot wait for ocean transit.',
                    features: ['Express and standard options', 'Charter flights for urgent cargo', 'Temperature-controlled handling'],
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h4.875c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125zM13.5 7.5h4.875c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125H13.5" /></svg>
                    ),
                    title: 'Ground Transport',
                    desc: 'Door-to-door trucking and rail services for domestic and cross-border overland shipments. Rail is 5x more emissions-efficient than road transport.',
                    features: ['FTL and LTL trucking', 'Intermodal rail solutions', 'Cross-border drayage'],
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    ),
                    title: 'Customs Clearance',
                    desc: 'Navigating the complex world of tariffs, duties, and trade regulations to ensure your goods clear customs without delays or penalties.',
                    features: ['Duty and tariff classification', 'Import/export compliance', 'Free trade zone management'],
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                    ),
                    title: 'Warehousing',
                    desc: 'Strategic storage and distribution services that keep your inventory positioned close to customers for faster fulfillment.',
                    features: ['Bonded and non-bonded facilities', 'Pick, pack, and ship', 'Inventory management systems'],
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
                    ),
                    title: 'Supply Chain Consulting',
                    desc: 'Expert analysis of your logistics operations to identify inefficiencies, reduce costs, and optimize your end-to-end supply chain strategy.',
                    features: ['Route optimization (15-25% fuel savings)', 'Container utilization analysis', 'Trade compliance advisory'],
                  },
                ].map((service) => (
                  <div key={service.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-red-200 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-red-700 mb-4 group-hover:bg-[#fef2f2] group-hover:border-red-200 transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#252728] mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                    <ul className="space-y-1.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="w-1.5 h-1.5 bg-red-700 rounded-full flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 4: THE PROCESS STEP BY STEP ═══════ */}
            <section
              id="section-4"
              className="article-section mb-16"
              data-section-id="section-4"
              data-section-type="bp-circular-process"
              data-section-role="explainer"
              data-section-heading="The Freight Forwarding Process: Step by Step"
              data-section-purpose="Walk through the 6-step freight forwarding process from booking to delivery"
            >
              <button className="section-edit-trigger" data-edit-section="section-4" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                The Freight Forwarding Process: Step by Step
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From the moment you contact a freight forwarder to the moment your goods arrive at their destination, here is exactly what happens at each stage.
              </p>

              {/* Visual process flow */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {[
                  { step: 1, title: 'Booking', icon: '📋', color: 'bg-red-700' },
                  { step: 2, title: 'Documentation', icon: '📄', color: 'bg-[#252728]' },
                  { step: 3, title: 'Cargo Pickup', icon: '🏗️', color: 'bg-red-700' },
                  { step: 4, title: 'Customs', icon: '🛂', color: 'bg-[#252728]' },
                  { step: 5, title: 'Transport', icon: '🚢', color: 'bg-red-700' },
                  { step: 6, title: 'Delivery', icon: '✅', color: 'bg-[#252728]' },
                ].map((item, i) => (
                  <div key={item.step} className="relative text-center">
                    <div className={`${item.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl md:text-3xl">{item.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Step {item.step}</span>
                    <h3 className="text-sm font-bold text-[#252728] mt-0.5">{item.title}</h3>
                    {i < 5 && (
                      <div className="hidden md:block absolute top-8 -right-2 md:top-10 md:-right-3">
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Expanded step descriptions */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#252728] mb-2">Step 1: Booking and Quote</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The process begins when you share your shipping requirements with the forwarder: cargo type, dimensions, weight, origin, destination, and desired delivery date. The forwarder evaluates multiple carrier options across different modes and routes, then presents you with a detailed quote covering freight charges, customs duties, insurance, and any surcharges. Once you approve, they secure space on the selected carrier.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#252728] mb-2">Step 2: Documentation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Your forwarder prepares or reviews all required shipping documents. This includes the Bill of Lading (BOL), commercial invoice, packing list, customs declaration, and any certificates of origin or specialized permits your cargo requires. Accurate documentation is critical -- errors here are the number one cause of customs delays and can result in fines or cargo holds.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#252728] mb-2">Step 3: Cargo Pickup</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The forwarder arranges collection of your cargo from the warehouse, factory, or storage facility. For LCL shipments, goods are transported to a consolidation warehouse where they are grouped with other shipments heading to the same destination. For FCL, the container is loaded directly at your location and sealed for transit.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#252728] mb-2">Step 4: Customs Clearance</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    At the port of export, your forwarder files all required customs declarations, pays applicable duties and taxes, and ensures compliance with export regulations. The same process happens in reverse at the destination country. Experienced forwarders maintain direct relationships with customs authorities and use electronic filing systems to accelerate clearance.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#252728] mb-2">Step 5: International Transport</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Your cargo moves via the selected mode -- ocean, air, or a combination of both. Throughout transit, the forwarder monitors the shipment using GPS tracking, carrier data feeds, and port status updates. If disruptions occur -- weather delays, port congestion, or vessel rerouting -- they proactively communicate with you and adjust logistics as needed.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#252728] mb-2">Step 6: Final Delivery</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Once customs clears the cargo at the destination port, the forwarder coordinates the last-mile delivery. This may involve drayage from port to warehouse, deconsolidation of LCL shipments, or direct delivery to your distribution center or retail location. You receive proof of delivery and final shipping documentation for your records.
                  </p>
                </div>
              </div>
            </section>

            {/* ═══════ SECTION 5: FORWARDER VS BROKER VS CARRIER ═══════ */}
            <section
              id="section-5"
              className="article-section mb-16"
              data-section-id="section-5"
              data-section-type="bp-comparison-table"
              data-section-role="clarifier"
              data-section-heading="Forwarder vs. Broker vs. Carrier"
              data-section-purpose="Clarify the differences between freight forwarders, brokers, and carriers"
            >
              <button className="section-edit-trigger" data-edit-section="section-5" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Forwarder vs. Broker vs. Carrier: What Is the Difference?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                These three terms are often used interchangeably, but they describe fundamentally different roles in the logistics chain. Understanding the distinction helps you choose the right partner for your shipping needs.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#252728] text-white">
                      <th className="text-left px-5 py-4 rounded-tl-xl text-sm font-semibold">Role</th>
                      <th className="text-left px-5 py-4 text-sm font-semibold">What They Do</th>
                      <th className="text-left px-5 py-4 text-sm font-semibold">Who They Work For</th>
                      <th className="text-left px-5 py-4 rounded-tr-xl text-sm font-semibold">Licensing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="px-5 py-4 font-bold text-red-700 text-sm">Freight Forwarder</td>
                      <td className="px-5 py-4 text-sm text-gray-600">Manages the entire shipping process: booking, documentation, customs, warehousing, and multi-modal transport coordination.</td>
                      <td className="px-5 py-4 text-sm text-gray-600">The shipper (exporter/importer). Acts as their logistics department.</td>
                      <td className="px-5 py-4 text-sm text-gray-600">FMC (OTI) license for ocean; IATA for air; may hold customs broker license.</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-5 py-4 font-bold text-[#252728] text-sm">Freight Broker</td>
                      <td className="px-5 py-4 text-sm text-gray-600">Connects shippers with carriers. Negotiates rates and arranges transport but does not handle cargo or documentation directly.</td>
                      <td className="px-5 py-4 text-sm text-gray-600">Both shippers and carriers. Earns commission as a middleman.</td>
                      <td className="px-5 py-4 text-sm text-gray-600">FMCSA broker license (domestic US); varies by country.</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-5 py-4 font-bold text-[#252728] text-sm rounded-bl-xl">Carrier</td>
                      <td className="px-5 py-4 text-sm text-gray-600">Owns and operates the actual transportation assets -- ships, planes, trucks, or rail. Physically moves the cargo.</td>
                      <td className="px-5 py-4 text-sm text-gray-600">Shippers, forwarders, and brokers who book space on their vessels or vehicles.</td>
                      <td className="px-5 py-4 text-sm text-gray-600 rounded-br-xl">Carrier-specific operating authority (e.g., FMC for ocean, DOT for trucking).</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#fef2f2] border border-red-200 rounded-xl p-5 mt-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-red-700">Key takeaway:</strong> A freight forwarder is the most comprehensive option for international shipping. They combine the services of brokers, customs agents, and logistics managers into a single point of contact. If you are shipping across borders and need end-to-end management, a freight forwarder is typically your best choice.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 6: WHY IT MATTERS ═══════ */}
            <section
              id="section-6"
              className="article-section mb-16"
              data-section-id="section-6"
              data-section-type="bp-benefit-highlights-grid"
              data-section-role="value-proposition"
              data-section-heading="Why Freight Forwarding Matters for Your Business"
              data-section-purpose="Highlight the key benefits of working with a freight forwarder"
            >
              <button className="section-edit-trigger" data-edit-section="section-6" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Why Freight Forwarding Matters for Your Business
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Working with a freight forwarder is not just about moving boxes. It is a strategic decision that directly impacts your bottom line, operational efficiency, and ability to compete in global markets.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ),
                    title: 'Cost Savings',
                    desc: 'Forwarders leverage bulk shipping volumes to negotiate rates individual shippers cannot access. They also optimize container utilization -- companies waste 25-40% of container space without expert packing guidance -- and identify the most cost-effective routes and modes.',
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    ),
                    title: 'Regulatory Compliance',
                    desc: 'International trade regulations change constantly. Forwarders stay current on tariff codes, trade sanctions, labeling requirements, and country-specific import rules. They ensure your shipments comply, avoiding costly fines, seizures, or shipment rejections at customs.',
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ),
                    title: 'Time Efficiency',
                    desc: 'Managing international shipments in-house requires dedicated staff, carrier relationships, and customs expertise. A forwarder handles all of this, freeing your team to focus on core business. Digital platforms now reduce booking time by 30% compared to manual processes.',
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                    ),
                    title: 'Risk Mitigation',
                    desc: 'From cargo insurance to contingency routing, forwarders build protection into every shipment. They monitor geopolitical risks, weather disruptions, and port congestion in real time, proactively rerouting or adjusting timelines before problems impact your operations.',
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                    ),
                    title: 'Global Network',
                    desc: 'Established forwarders maintain agent networks spanning 50 or more countries. This means local expertise at every origin and destination, relationships with port authorities, and the ability to move cargo through even the most complex trade lanes seamlessly.',
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                    ),
                    title: 'Scalability',
                    desc: 'Whether you ship one container per month or a hundred, a forwarder scales with your business. They handle seasonal volume spikes, new market entries, and supply chain redesigns without requiring you to build internal logistics infrastructure from scratch.',
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-200 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-[#fef2f2] rounded-xl flex items-center justify-center text-red-700 mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#252728] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 7: KEY DOCUMENTS ═══════ */}
            <section
              id="section-7"
              className="article-section mb-16"
              data-section-id="section-7"
              data-section-type="bp-key-insight"
              data-section-role="educational"
              data-section-heading="Key Documents in Freight Forwarding"
              data-section-purpose="Educate readers on the essential documents involved in international shipping"
            >
              <button className="section-edit-trigger" data-edit-section="section-7" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Key Documents in Freight Forwarding
              </h2>

              {/* Key insight callout */}
              <div className="bg-[#252728] text-white rounded-2xl p-6 md:p-8 my-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-700 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Documentation is the #1 cause of customs delays</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Incomplete or inaccurate paperwork accounts for more customs holds and shipment delays than any other single factor. A single missing document can add days to transit time and hundreds of dollars in demurrage charges. Getting documentation right the first time is where experienced freight forwarders deliver the most immediate value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose-article space-y-6 text-gray-700 leading-relaxed">
                <p>
                  International shipping requires a precise set of documents to satisfy carriers, customs authorities, and trade regulations at both the origin and destination. Here are the five documents you will encounter on every shipment.
                </p>

                <div className="space-y-5">
                  <div className="border-l-4 border-red-700 pl-5">
                    <h3 className="font-bold text-[#252728] text-lg">Bill of Lading (BOL)</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      The most important document in ocean freight. The BOL serves three functions: it is a receipt confirming the carrier has received your goods, a contract of carriage outlining the terms of transport, and a document of title that can be used to transfer ownership of the goods. There are two types -- a straight BOL (non-negotiable, goods delivered to a named consignee) and an order BOL (negotiable, can be endorsed to third parties).
                    </p>
                  </div>
                  <div className="border-l-4 border-red-700 pl-5">
                    <h3 className="font-bold text-[#252728] text-lg">Commercial Invoice</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      Issued by the seller to the buyer, this document details the transaction: what was sold, the quantity, the agreed price, payment terms, and the identities of both parties. Customs authorities use the commercial invoice to assess duties and taxes. It must match the information on all other shipping documents exactly -- discrepancies trigger inspections and delays.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-700 pl-5">
                    <h3 className="font-bold text-[#252728] text-lg">Packing List</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      A detailed inventory of the shipment contents including the number of packages, their individual weights and dimensions, and a description of contents. Customs officials use the packing list to verify the shipment against the commercial invoice. It also guides warehouse staff during loading, unloading, and storage.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-700 pl-5">
                    <h3 className="font-bold text-[#252728] text-lg">Customs Declaration</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      Filed electronically with customs authorities at both origin and destination, this document declares the nature, value, and classification of your goods using Harmonized System (HS) codes. The HS code determines the applicable tariff rate. Misclassification -- whether accidental or intentional -- can result in penalties, cargo seizure, or audit action.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-700 pl-5">
                    <h3 className="font-bold text-[#252728] text-lg">Certificate of Origin</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      This document certifies the country where the goods were manufactured or produced. It is essential for determining eligibility for preferential tariff rates under free trade agreements. For example, goods manufactured in a country with a trade agreement may qualify for reduced or zero duties. Certificates of origin are typically issued by the local chamber of commerce or a government trade authority.
                    </p>
                  </div>
                </div>
              </div>

              <ImagePlaceholder alt="International Shipping Documents and Customs Paperwork" aspect="16/9" />
            </section>

            {/* ═══════ SECTION 8: GLOBAL REACH ═══════ */}
            <section
              id="section-8"
              className="article-section mb-16"
              data-section-id="section-8"
              data-section-type="bp-map-infographic"
              data-section-role="context-expansion"
              data-section-heading="Global Reach: The Scale of Freight Forwarding"
              data-section-purpose="Illustrate the global scale and key trade hubs in freight forwarding"
            >
              <button className="section-edit-trigger" data-edit-section="section-8" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Global Reach: The Scale of Freight Forwarding
              </h2>

              {/* Stats strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {[
                  { stat: '80%', label: 'of global trade moves by ocean' },
                  { stat: '$6.68T', label: 'global logistics market value' },
                  { stat: '50+', label: 'countries in a typical forwarder network' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#252728] text-white rounded-2xl p-5 text-center">
                    <div className="text-3xl md:text-4xl font-extrabold text-red-400 mb-1">{item.stat}</div>
                    <div className="text-xs text-gray-300 uppercase tracking-wide font-medium">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  Freight forwarding is inherently global. The world&apos;s major trade routes connect manufacturing hubs in Asia with consumer markets in North America and Europe, and increasingly with growing economies in Africa, the Middle East, and South America. Understanding the key trade hubs gives you insight into where your forwarder&apos;s network strength matters most.
                </p>
              </div>

              {/* Trade hubs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { city: 'Shanghai', country: 'China', desc: 'The world\'s busiest container port, processing over 47 million TEUs annually. The gateway for Asia-Pacific exports.', tag: '#1 Container Port' },
                  { city: 'Rotterdam', country: 'Netherlands', desc: 'Europe\'s largest port and the primary entry point for goods flowing into the EU market. A major hub for transshipment.', tag: 'EU Gateway' },
                  { city: 'Los Angeles', country: 'United States', desc: 'The busiest port complex in the Western Hemisphere, handling nearly 40% of all US containerized imports from Asia.', tag: 'US West Coast Hub' },
                  { city: 'Singapore', country: 'Singapore', desc: 'A critical transshipment hub connecting East Asia, South Asia, and Oceania. Known for world-class port efficiency.', tag: 'Transshipment Leader' },
                  { city: 'Dubai', country: 'UAE', desc: 'The strategic bridge between East and West, connecting Asian manufacturing with African and European markets via Jebel Ali Port.', tag: 'East-West Crossroads' },
                ].map((hub) => (
                  <div key={hub.city} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-red-200 transition-colors">
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">{hub.tag}</span>
                    <h3 className="text-lg font-bold text-[#252728] mt-1">{hub.city}, {hub.country}</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{hub.desc}</p>
                  </div>
                ))}
              </div>

              <ImagePlaceholder alt="World Map Showing Major Freight Forwarding Trade Routes and Hubs" aspect="16/9" />

              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mt-8">
                <p>
                  The green logistics sector is growing at a 9% CAGR as environmental regulations tighten worldwide. Forwarders are increasingly investing in carbon-neutral shipping options, route optimization that delivers 15-25% fuel savings, and partnerships with carriers operating cleaner vessels. AI is projected to manage 20% of logistics tasks within five years, further optimizing global trade flows.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 9: FAQ ═══════ */}
            <section
              id="section-9"
              className="article-section mb-16"
              data-section-id="section-9"
              data-section-type="bp-accordion-process"
              data-section-role="faq"
              data-section-heading="Frequently Asked Questions"
              data-section-purpose="Answer the most common freight forwarding questions"
            >
              <button className="section-edit-trigger" data-edit-section="section-9" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Get clear answers to the questions businesses ask most about working with freight forwarders.
              </p>

              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:border-red-200 transition-colors">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-[#252728] text-sm pr-4">{item.q}</span>
                      <svg
                        className={`w-5 h-5 text-red-700 flex-shrink-0 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {faqOpen === i && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                        <p className="pt-3">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 10: KEY TAKEAWAYS + CTA ═══════ */}
            <section
              id="section-10"
              className="article-section mb-16"
              data-section-id="section-10"
              data-section-type="bp-takeaways-box"
              data-section-role="summary-cta"
              data-section-heading="Key Takeaways"
              data-section-purpose="Summarize the article and drive reader action"
            >
              <button className="section-edit-trigger" data-edit-section="section-10" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Key Takeaways
              </h2>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 my-8">
                <ul className="space-y-4">
                  {[
                    'Freight forwarders are strategic intermediaries who manage the entire shipping process -- from booking and documentation to customs clearance and final delivery.',
                    'The global freight forwarding market is valued at $336.61B in 2026 and growing at 6% annually, reflecting its critical role in world trade.',
                    'Six core services cover every need: ocean freight, air freight, ground transport, customs clearance, warehousing, and supply chain consulting.',
                    'Accurate documentation is the single most important factor in avoiding customs delays, fines, and cargo holds.',
                    'Working with a forwarder delivers measurable benefits: cost savings through bulk rates, regulatory compliance, risk mitigation, and access to a global network.',
                    'Digital platforms and AI are transforming the industry -- reducing booking time by 30%, improving visibility by 25%, and projecting 20% of logistics tasks to be AI-managed within five years.',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#252728] to-[#1a1d1e] rounded-2xl p-8 md:p-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Ship Smarter?</h3>
                <p className="text-gray-300 mb-6 max-w-lg mx-auto leading-relaxed">
                  World Pac Logistics provides reliable, transparent freight forwarding services with cutting-edge technology and a trusted global network. Let us simplify your supply chain.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
                  >
                    Get a Free Quote
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center border border-gray-500 hover:border-white text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
            </section>

          </div>

          {/* ─── SIDEBAR TOC (DESKTOP) ─── */}
          <aside ref={sidebarRef} className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">In This Article</h4>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-1.5 px-3 text-sm rounded-lg transition-all ${
                      activeTocId === item.id
                        ? 'text-red-700 bg-[#fef2f2] font-semibold border-l-2 border-red-700'
                        : 'text-gray-500 hover:text-[#252728] hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Sidebar CTA */}
              <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-[#252728] text-sm mb-2">Need Freight Forwarding Help?</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Our logistics experts can help you find the most reliable, cost-effective shipping solution for your business.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
                >
                  Contact Us
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══════ EDIT OVERLAY ═══════ */}
      {editOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#252728]">
                Edit Section: {editTarget?.heading}
              </h3>
              <button
                onClick={() => setEditOverlayOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="text-xs text-gray-400 mb-3 space-y-0.5">
              <p>Section ID: {editTarget?.id}</p>
              <p>Type: {editTarget?.type} | Role: {editTarget?.role}</p>
            </div>
            <textarea
              value={editInstruction}
              onChange={(e) => setEditInstruction(e.target.value)}
              placeholder="Describe the changes you want to make to this section..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 min-h-[100px] resize-y"
            />
            {editStatus?.type === 'success' && (
              <p className="text-green-600 text-xs mt-2">{editStatus.message}</p>
            )}
            {editStatus?.type === 'fallback' && (
              <div className="mt-2">
                <p className="text-amber-600 text-xs mb-1">Could not copy automatically. Copy the prompt below:</p>
                <textarea readOnly value={editStatus.prompt} className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-500 h-20 resize-none" />
              </div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditOverlayOpen(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyEdit}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Copy Edit Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ SECTION EDIT TRIGGER STYLES ═══════ */}
      <style jsx global>{`
        .section-edit-trigger {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 20;
          background: rgba(255,255,255,0.9);
          border: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
          backdrop-filter: blur(4px);
        }
        .section-edit-trigger:hover {
          background: #b91c1c;
          color: white;
          border-color: #b91c1c;
        }
        .article-section {
          position: relative;
        }
        .article-section:hover .section-edit-trigger {
          opacity: 1;
        }
      `}</style>
    </main>
  );
}
