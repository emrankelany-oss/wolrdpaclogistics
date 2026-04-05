'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ARTICLE_TOPIC = 'Supply Chain Logistics';
const ARTICLE_FILE =
  'src/app/articles/supply-chain-logistics-complete-guide-2026/ArticleClient.jsx';

/* ─────────── TOC DATA ─────────── */
const tocItems = [
  { id: 'section-2', label: 'Industry at a Glance' },
  { id: 'section-3', label: 'What Is Supply Chain Logistics?' },
  { id: 'section-4', label: 'The Evolution of Supply Chains' },
  { id: 'section-5', label: 'How Modern Supply Chains Work' },
  { id: 'section-6', label: 'AI and Agentic Intelligence' },
  { id: 'section-7', label: 'Warehouse Automation' },
  { id: 'section-8', label: 'Disruptions and Resilience' },
  { id: 'section-9', label: 'Sustainable Practices' },
  { id: 'section-10', label: 'The Technology Stack' },
  { id: 'section-11', label: 'Common Challenges' },
  { id: 'section-12', label: 'Best Practices' },
  { id: 'section-13', label: 'Future Outlook' },
  { id: 'section-14', label: 'FAQ' },
];

/* ─────────── EDIT SYSTEM HELPERS ─────────── */
function buildEditPrompt(sectionId, sectionType, sectionRole, sectionPurpose, sectionHeading, userInstruction) {
  return `SECTION_EDIT:\nUse the article-engine skill to update section ${sectionId}.\n\nTopic: ${ARTICLE_TOPIC}\nArticle file: ${ARTICLE_FILE}\nSection ID: ${sectionId}\nSection type: ${sectionType}\nSection role: ${sectionRole}\nSection purpose: ${sectionPurpose}\nCurrent section heading: ${sectionHeading}\n\nUser requested change: ${userInstruction}\n\nRULES:\n- Update only this section unless minimal surrounding adjustment needed\n- Preserve topic domain integrity and page style\n- If heading changes, update sidebar TOC entry to match\n- Maintain data-section-id, data-section-type, data-section-role attributes`;
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function ArticleClient() {
  const [activeSection, setActiveSection] = useState(null);
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
      q: 'What is supply chain logistics?',
      a: 'Supply chain logistics encompasses the planning, implementation, and control of the flow of goods, services, and information from point of origin to point of consumption. It includes procurement, manufacturing, warehousing, transportation, and last-mile delivery.',
    },
    {
      q: 'How is AI transforming supply chain management?',
      a: 'AI is transforming supply chains through demand forecasting (reducing overstock by 30%), autonomous decision-making via Agentic AI, predictive maintenance, route optimization, and real-time visibility. The AI in supply chain market is projected to reach $236 billion by 2035.',
    },
    {
      q: 'What are the biggest supply chain challenges in 2026?',
      a: 'The top challenges include tariff volatility and trade policy shifts, chronic labor shortages, climate-related disruptions, cybersecurity threats, limited end-to-end visibility (only 6% of businesses have full visibility), and rising energy costs for automated facilities.',
    },
    {
      q: 'How much does supply chain disruption cost businesses?',
      a: '94% of companies report revenue losses from supply chain disruptions, with 80% experiencing at least one major disruption per year. The average cost of a single disruption can range from hundreds of thousands to millions of dollars depending on industry and scale.',
    },
    {
      q: 'What is the ROI of warehouse automation?',
      a: 'Automated warehouses process orders 4-5x faster than manual operations with 99.9% accuracy. The typical ROI is achieved within 2-3 years, with 25-40% savings in labor costs. 93% of executives plan to use automation within the next two years.',
    },
    {
      q: 'Is sustainable logistics financially viable?',
      a: 'Yes. Sustainable logistics investments deliver 15-20% ROI over a 5-year period through fuel savings, tax incentives, and customer preference. Electric delivery fleets are growing 42% year-over-year, and 40% of executives prioritize fleet electrification.',
    },
    {
      q: 'What technologies should logistics companies invest in?',
      a: 'Priority investments for 2026 include AI/ML platforms, IoT sensors and digital twins, cloud logistics software (growing at 10.2% CAGR), real-time visibility tools, autonomous vehicles and drones, and blockchain for supply chain transparency.',
    },
    {
      q: 'What is the difference between 3PL and 4PL?',
      a: 'A 3PL (third-party logistics) provider handles specific logistics functions like warehousing and transportation. A 4PL (fourth-party logistics) acts as a single point of contact managing the entire supply chain, coordinating multiple 3PLs and optimizing the full network.',
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section
        id="section-1"
        className="article-section relative w-full min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden rounded-b-[2rem]"
        data-section-id="section-1"
        data-section-type="hero"
        data-section-role="introduction"
        data-section-heading="Supply Chain Logistics 101: The Complete Guide for 2026"
        data-section-purpose="Set visual tone and introduce the article topic"
      >
        <button className="section-edit-trigger" data-edit-section="section-1" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
        {/* IMAGE PLACEHOLDER: Aerial container port at golden hour sunset, cargo cranes, colorful containers, 16:9 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#252728] via-[#1a1d1e] to-[#252728]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(185,28,28,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 pt-32 w-full">
          <nav className="text-sm text-gray-300 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Articles</span>
          </nav>
          <span className="inline-block bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Supply Chain Management
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Supply Chain Logistics 101: The Complete Guide for 2026
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              World Pac Logistics
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              April 5, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              18 min read
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
            <svg className={`w-5 h-5 transition-transform ${tocOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
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

            {/* ═══════ SECTION 2: STATS CARDS ═══════ */}
            <section
              id="section-2"
              className="article-section mb-16"
              data-section-id="section-2"
              data-section-type="data-visualization"
              data-section-role="context-setter"
              data-section-heading="The Supply Chain Industry at a Glance"
              data-section-purpose="Display key industry metrics in a scannable grid"
            >
              <button className="section-edit-trigger" data-edit-section="section-2" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                The Supply Chain Industry at a Glance
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Before diving into the details, here are the numbers that define the global supply chain landscape in 2026.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { number: '$12T', label: 'Global Logistics Revenue' },
                  { number: '$13.8B', label: 'AI in Supply Chain Market' },
                  { number: '94%', label: 'Companies Hit by Disruptions' },
                  { number: '93%', label: 'Executives Adopting Automation' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center hover:border-red-200 hover:shadow-md transition-all">
                    <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">{stat.number}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 3: WHAT IS SUPPLY CHAIN LOGISTICS ═══════ */}
            <section
              id="section-3"
              className="article-section mb-16"
              data-section-id="section-3"
              data-section-type="educational"
              data-section-role="foundation"
              data-section-heading="What Is Supply Chain Logistics?"
              data-section-purpose="Define core concepts and explain why supply chain logistics matters"
            >
              <button className="section-edit-trigger" data-edit-section="section-3" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                What Is Supply Chain Logistics?
              </h2>
              {/* IMAGE PLACEHOLDER: Modern warehouse operations, conveyor belts, workers with tablets, 4:3 */}
              <div className="my-8 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-400 px-8">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
                  <p className="text-sm font-medium">Modern Warehouse Operations</p>
                </div>
              </div>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Supply chain logistics is the backbone of global commerce. It encompasses every step involved in moving products from raw materials to the end consumer — including <strong>procurement</strong>, <strong>manufacturing</strong>, <strong>warehousing</strong>, <strong>transportation</strong>, and <strong>last-mile delivery</strong>.
                </p>
                <p>
                  In 2026, supply chain logistics has evolved far beyond simple shipping and storage. Modern supply chains are interconnected digital ecosystems powered by artificial intelligence, real-time data, and autonomous decision-making systems. The industry generates over <strong>$12 trillion in annual revenue</strong> and touches virtually every product consumers interact with daily.
                </p>
                <h3 className="text-xl font-bold text-[#252728] mt-8 mb-3">Core Components</h3>
                <ul className="space-y-3 ml-1">
                  {[
                    { title: 'Procurement & Sourcing', desc: 'Strategic acquisition of raw materials and goods from global suppliers' },
                    { title: 'Manufacturing & Production', desc: 'Converting raw materials into finished products through optimized processes' },
                    { title: 'Warehousing & Inventory', desc: 'Storage, organization, and management of goods across distribution centers' },
                    { title: 'Transportation & Freight', desc: 'Moving goods via ocean, air, rail, and road across domestic and international routes' },
                    { title: 'Last-Mile Delivery', desc: 'The final leg from distribution center to the customer\'s doorstep' },
                    { title: 'Reverse Logistics', desc: 'Managing returns, recycling, and disposal of products and packaging' },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </span>
                      <div>
                        <strong className="text-[#252728]">{item.title}:</strong> {item.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ═══════ SECTION 4: TIMELINE ═══════ */}
            <section
              id="section-4"
              className="article-section mb-16"
              data-section-id="section-4"
              data-section-type="chronological"
              data-section-role="historical-context"
              data-section-heading="The Evolution of Supply Chain Management"
              data-section-purpose="Show key milestones from JIT to Agentic AI"
            >
              <button className="section-edit-trigger" data-edit-section="section-4" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                The Evolution of Supply Chain Management
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Supply chain logistics has undergone radical transformation over five decades. Here are the defining milestones.
              </p>
              <div className="relative">
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                {[
                  { year: '1970s', title: 'Just-In-Time (JIT)', desc: 'Toyota revolutionizes manufacturing with JIT methodology, minimizing inventory waste and introducing lean production principles.' },
                  { year: '1980s', title: 'ERP Systems Emerge', desc: 'Enterprise Resource Planning software connects procurement, inventory, and distribution into unified digital platforms for the first time.' },
                  { year: '1990s', title: 'Globalization Boom', desc: 'Free trade agreements and containerization enable truly global supply chains. Outsourcing to Asia becomes standard practice.' },
                  { year: '2000s', title: 'E-Commerce Revolution', desc: 'Amazon and online retail redefine consumer expectations. Same-day and next-day delivery become competitive differentiators.' },
                  { year: '2010s', title: 'IoT and Real-Time Tracking', desc: 'Connected sensors, GPS tracking, and cloud platforms bring real-time visibility to supply chain operations worldwide.' },
                  { year: '2020-22', title: 'Pandemic Stress Test', desc: 'COVID-19 exposes fragility in global supply chains. Chip shortages, port congestion, and labor gaps force a complete rethink of resilience.' },
                  { year: '2023-24', title: 'Generative AI Arrives', desc: 'AI transforms demand forecasting, route optimization, and automated documentation across logistics networks.' },
                  { year: '2025-26', title: 'Agentic AI Era', desc: 'Autonomous AI systems make multi-step decisions without human intervention. 60% of disruptions predicted to be resolved by AI by 2031.' },
                ].map((milestone, i) => (
                  <div key={milestone.year} className="relative flex items-start gap-4 md:gap-6 mb-8 last:mb-0">
                    <div className="relative z-10 flex-shrink-0 w-8 md:w-12 h-8 md:h-12 bg-white border-2 border-red-700 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-700 rounded-full" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-200 hover:border-red-200 transition-colors">
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-[#252728] mt-1 mb-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 5: PROCESS FLOW ═══════ */}
            <section
              id="section-5"
              className="article-section mb-16"
              data-section-id="section-5"
              data-section-type="process-flow"
              data-section-role="explainer"
              data-section-heading="How Modern Supply Chains Work"
              data-section-purpose="Visualize the end-to-end supply chain process flow"
            >
              <button className="section-edit-trigger" data-edit-section="section-5" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                How Modern Supply Chains Work
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                A modern supply chain is a synchronized network of processes, each feeding into the next. Here is how goods flow from source to consumer.
              </p>
              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-0">
                {[
                  { step: '01', title: 'Sourcing', desc: 'Identify suppliers, negotiate contracts, procure raw materials', icon: '🔍' },
                  { step: '02', title: 'Production', desc: 'Transform materials into finished goods through manufacturing', icon: '🏭' },
                  { step: '03', title: 'Warehousing', desc: 'Store, sort, and manage inventory in distribution centers', icon: '📦' },
                  { step: '04', title: 'Transport', desc: 'Move goods via ocean, air, rail, or road to regional hubs', icon: '🚢' },
                  { step: '05', title: 'Last Mile', desc: 'Deliver from local hub to the customer\'s doorstep', icon: '🚚' },
                ].map((item, i) => (
                  <div key={item.step} className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 flex-1">
                    <div className="w-16 h-16 bg-[#252728] rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="md:text-center flex-1 md:flex-none">
                      <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Step {item.step}</span>
                      <h3 className="text-sm font-bold text-[#252728] mt-0.5">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">{item.desc}</p>
                    </div>
                    {i < 4 && (
                      <div className="hidden md:block flex-shrink-0 mx-2">
                        <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 6: AI AND AGENTIC INTELLIGENCE ═══════ */}
            <section
              id="section-6"
              className="article-section mb-16"
              data-section-id="section-6"
              data-section-type="data-visualization"
              data-section-role="deep-dive"
              data-section-heading="AI and Agentic Intelligence in Logistics"
              data-section-purpose="Deep dive into AI adoption, market growth, and Agentic AI impact"
            >
              <button className="section-edit-trigger" data-edit-section="section-6" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                AI and Agentic Intelligence in Logistics
              </h2>
              {/* IMAGE PLACEHOLDER: AI-powered logistics control center, holographic displays, blue/white, 4:3 */}
              <div className="my-8 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-400 px-8">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
                  <p className="text-sm font-medium">AI-Powered Logistics Control Center</p>
                </div>
              </div>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  Artificial intelligence has moved from experimental pilot programs to the operational core of supply chain management. In 2026, the shift toward <strong>Agentic AI</strong> — autonomous systems capable of reasoning through complex logic chains and executing multi-step workflows — represents the industry's most significant technological leap.
                </p>
                <p>
                  Unlike traditional AI that requires human oversight at each decision point, Agentic AI can independently reroute shipments during disruptions, renegotiate carrier rates based on real-time market conditions, and rebalance inventory across a global network — all without waiting for human approval.
                </p>
              </div>
              {/* Metric Cards with Trend Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { metric: '$9.94B', label: '2025 Market Size', trend: '+39%', direction: 'up' },
                  { metric: '$13.81B', label: '2026 Projected', trend: '+37.3% CAGR', direction: 'up' },
                  { metric: '$236B', label: '2035 Forecast', trend: '17x growth', direction: 'up' },
                ].map((card) => (
                  <div key={card.label} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{card.label}</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                        {card.trend}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-[#252728]">{card.metric}</div>
                  </div>
                ))}
              </div>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-[#252728] mt-4 mb-3">Operational Impact</h3>
                <p>
                  Early adopters of AI-enabled supply chain management report transformative results: a <strong>15% reduction in logistics costs</strong>, a <strong>35% drop in inventory levels</strong>, and a <strong>65% improvement in service efficiency</strong>. AI-powered demand forecasting alone reduces overstock by 30% and stockouts by 65%.
                </p>
                <p>
                  According to Gartner, <strong>55% of supply chain leaders expect Agentic AI to reduce the need to hire for entry-level positions</strong> — shifting focus toward upskilling existing talent to collaborate with autonomous systems. By 2031, an estimated 60% of supply chain disruptions will be resolved entirely without human intervention.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 7: WAREHOUSE AUTOMATION ═══════ */}
            <section
              id="section-7"
              className="article-section mb-16"
              data-section-id="section-7"
              data-section-type="comparison"
              data-section-role="analysis"
              data-section-heading="Warehouse Automation and Robotics"
              data-section-purpose="Compare manual vs automated warehouse operations with data"
            >
              <button className="section-edit-trigger" data-edit-section="section-7" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Warehouse Automation and Robotics
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With 74% of supply chain executives ramping up automation investments to mitigate talent shortages, the modern warehouse looks nothing like its predecessors.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#252728] text-white">
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Metric</th>
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Manual Operations</th>
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Automated Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { metric: 'Order Processing Speed', manual: 'Baseline (1x)', auto: '4-5x faster' },
                      { metric: 'Accuracy Rate', manual: '~97%', auto: '99.9%' },
                      { metric: 'Labor Cost Savings', manual: '—', auto: '25-40% reduction' },
                      { metric: 'ROI Timeline', manual: '—', auto: '2-3 years' },
                      { metric: 'Scalability', manual: 'Linear (more workers)', auto: 'Exponential (software updates)' },
                      { metric: '24/7 Operations', manual: 'Requires shift rotation', auto: 'Fully autonomous' },
                      { metric: 'Error Recovery', manual: 'Manual inspection', auto: 'AI-detected, auto-corrected' },
                    ].map((row, i) => (
                      <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 font-medium text-[#252728]">{row.metric}</td>
                        <td className="py-3 px-4 text-gray-500">{row.manual}</td>
                        <td className="py-3 px-4 text-red-700 font-medium">{row.auto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed">
                An important consideration for 2026: the intense integration of robotics and AI data centers has made <strong>access to electrical power a top-three factor</strong> in global location selection for logistics facilities. 76% of executives expect their facility power needs to rise by 10-50% over the next five years.
              </p>
            </section>

            {/* ═══════ SECTION 8: DISRUPTIONS AND RESILIENCE ═══════ */}
            <section
              id="section-8"
              className="article-section mb-16"
              data-section-id="section-8"
              data-section-type="feature-display"
              data-section-role="strategic-insight"
              data-section-heading="Supply Chain Disruptions and Resilience"
              data-section-purpose="Present disruption statistics and resilience strategies"
            >
              <button className="section-edit-trigger" data-edit-section="section-8" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Supply Chain Disruptions and Resilience
              </h2>
              {/* IMAGE PLACEHOLDER: Global shipping routes map, trade lanes, 4:3 */}
              <div className="my-8 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-400 px-8">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
                  <p className="text-sm font-medium">Global Supply Chain Routes</p>
                </div>
              </div>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  The convergence of shifting trade policies, extreme weather events, and geopolitical tension has made resilience the defining theme of modern supply chain strategy. An overwhelming <strong>94% of companies report revenue losses from supply chain disruptions</strong>, with 80% experiencing at least one major disruption in the past year.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { title: 'Regionalization', desc: '60% of executives expect supply chains to become increasingly regionalized by 2030, building duplicative networks closer to end consumers.', icon: '🌐' },
                  { title: 'Multi-Sourcing', desc: 'Companies are diversifying supplier bases across geographies to eliminate single points of failure in procurement.', icon: '🔗' },
                  { title: 'Digital Twins', desc: 'Virtual replicas of supply chain networks enable scenario planning and stress testing before real disruptions occur.', icon: '🖥️' },
                  { title: 'Real-Time Visibility', desc: 'Only 6% of businesses have full end-to-end visibility — representing a massive growth opportunity for visibility platforms.', icon: '👁️' },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-red-200 transition-colors">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h3 className="text-base font-bold text-[#252728] mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">
                To navigate this volatility, <strong>82% of supply chain organizations increased their IT spending</strong> heading into 2026, with focus on cloud logistics software (growing at 10.2% CAGR) and real-time visibility tools.
              </p>
            </section>

            {/* ═══════ SECTION 9: SUSTAINABILITY ═══════ */}
            <section
              id="section-9"
              className="article-section mb-16"
              data-section-id="section-9"
              data-section-type="actionable"
              data-section-role="guidance"
              data-section-heading="Sustainable Supply Chain Practices"
              data-section-purpose="Present sustainability strategies with do/don't guidance and ROI data"
            >
              <button className="section-edit-trigger" data-edit-section="section-9" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Sustainable Supply Chain Practices
              </h2>
              {/* IMAGE PLACEHOLDER: Electric delivery fleet, green logistics, 4:3 */}
              <div className="my-8 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-400 px-8">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
                  <p className="text-sm font-medium">Electric Delivery Fleet</p>
                </div>
              </div>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  With the logistics sector responsible for approximately <strong>11% of global CO2 emissions</strong>, sustainability has moved from corporate social responsibility to operational necessity. Regulatory pressures like the EU's Digital Product Passport are forcing companies to establish greener networks — and the data shows it pays off.
                </p>
              </div>
              {/* Do/Don't Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-green-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Do
                  </h3>
                  <ul className="space-y-2 text-sm text-green-900">
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">+</span> Electrify delivery fleets (42% YoY growth)</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">+</span> Optimize routes with AI to reduce fuel consumption</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">+</span> Invest in renewable energy for warehouses</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">+</span> Track carbon footprint across the full chain</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">+</span> Adopt circular logistics for returns and packaging</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-red-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
                    Don&apos;t
                  </h3>
                  <ul className="space-y-2 text-sm text-red-900">
                    <li className="flex items-start gap-2"><span className="text-red-600 mt-0.5">-</span> Treat sustainability as only a compliance checkbox</li>
                    <li className="flex items-start gap-2"><span className="text-red-600 mt-0.5">-</span> Ignore Scope 3 emissions from suppliers and partners</li>
                    <li className="flex items-start gap-2"><span className="text-red-600 mt-0.5">-</span> Greenwash without measurable targets and timelines</li>
                    <li className="flex items-start gap-2"><span className="text-red-600 mt-0.5">-</span> Delay fleet transition — EV costs are falling rapidly</li>
                    <li className="flex items-start gap-2"><span className="text-red-600 mt-0.5">-</span> Overlook the ROI case (15-20% over 5 years)</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>The business case is clear:</strong> Sustainable logistics investments deliver <strong>15-20% ROI over a 5-year period</strong> through fuel savings, tax incentives, and customer preference. Currently, 14% of global last-mile deliveries are emission-free, with electric delivery vehicle fleets growing at <strong>42% year-over-year</strong>.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 10: TECHNOLOGY STACK ═══════ */}
            <section
              id="section-10"
              className="article-section mb-16"
              data-section-id="section-10"
              data-section-type="comparison"
              data-section-role="toolkit"
              data-section-heading="The Technology Stack for 2026"
              data-section-purpose="Compare key technologies powering modern supply chain operations"
            >
              <button className="section-edit-trigger" data-edit-section="section-10" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                The Technology Stack for 2026
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The modern logistics technology stack integrates multiple systems working in concert. Here is what leading companies are investing in.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#252728] text-white">
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Technology</th>
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Use Case</th>
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Adoption</th>
                      <th className="text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider">Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { tech: 'AI / Machine Learning', use: 'Demand forecasting, route optimization', adoption: 'High', impact: '15% cost reduction' },
                      { tech: 'IoT Sensors', use: 'Real-time tracking, condition monitoring', adoption: 'High', impact: 'Full chain visibility' },
                      { tech: 'Cloud Logistics', use: 'Unified platform operations', adoption: 'Growing (10.2% CAGR)', impact: 'Scalable ops' },
                      { tech: 'Digital Twins', use: 'Simulation, scenario planning', adoption: 'Medium', impact: 'Risk mitigation' },
                      { tech: 'Blockchain', use: 'Provenance, contract automation', adoption: 'Emerging', impact: 'Trust & transparency' },
                      { tech: 'Autonomous Vehicles', use: 'Warehouse robots, delivery drones', adoption: 'Growing', impact: '4-5x throughput' },
                      { tech: 'RPA', use: 'Document processing, compliance', adoption: 'High', impact: '60% task automation' },
                    ].map((row, i) => (
                      <tr key={row.tech} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 font-medium text-[#252728]">{row.tech}</td>
                        <td className="py-3 px-4 text-gray-600">{row.use}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            row.adoption === 'High' ? 'bg-green-100 text-green-700' :
                            row.adoption === 'Emerging' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>{row.adoption}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ═══════ SECTION 11: COMMON CHALLENGES (FAQ ACCORDION) ═══════ */}
            <section
              id="section-11"
              className="article-section mb-16"
              data-section-id="section-11"
              data-section-type="interactive"
              data-section-role="problem-solving"
              data-section-heading="Common Supply Chain Challenges"
              data-section-purpose="Address top challenges in Q&A accordion format"
            >
              <button className="section-edit-trigger" data-edit-section="section-11" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Common Supply Chain Challenges
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Despite technological advances, logistics leaders face persistent challenges. Here are the most critical issues and emerging solutions.
              </p>
              <div className="space-y-3">
                {[
                  { q: 'End-to-End Visibility Gaps', a: 'Only 6% of businesses have full supply chain visibility. Investing in IoT, cloud platforms, and unified data layers is essential. Companies that achieve real-time tracking report 15-20% faster response times to disruptions.' },
                  { q: 'Chronic Labor Shortages', a: '74% of executives cite talent shortages as a primary driver for automation investment. The solution is a dual approach: automate repetitive tasks with robotics while upskilling existing workforce for human-AI collaboration.' },
                  { q: 'Tariff and Trade Volatility', a: 'Fluctuating tariffs and geopolitical shifts require agile sourcing strategies. Leading companies build multi-sourcing networks across 3-4 regions and use AI to simulate tariff impact scenarios before they materialize.' },
                  { q: 'Last-Mile Cost Escalation', a: 'Last-mile delivery accounts for up to 53% of total shipping costs. Micro-fulfillment centers, route optimization AI, and electric vehicle fleets are the primary strategies for cost reduction.' },
                  { q: 'Cybersecurity Threats', a: 'As supply chains digitize, attack surface grows. Supply chain cyberattacks increased 42% in 2025. Zero-trust architectures, vendor security audits, and encrypted data sharing are now minimum requirements.' },
                  { q: 'Climate and Weather Disruptions', a: 'Extreme weather events disrupted 30% of global shipping routes in 2025. Building redundancy through alternative routing, regional inventory buffers, and AI-powered weather prediction enables faster response.' },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === `c${i}` ? null : `c${i}`)}
                      className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#252728] pr-4">{item.q}</span>
                      <svg className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${faqOpen === `c${i}` ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    {faqOpen === `c${i}` && (
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ SECTION 12: BEST PRACTICES ═══════ */}
            <section
              id="section-12"
              className="article-section mb-16"
              data-section-id="section-12"
              data-section-type="summary"
              data-section-role="actionable-advice"
              data-section-heading="Best Practices for Supply Chain Excellence"
              data-section-purpose="Deliver actionable best practices with supporting evidence"
            >
              <button className="section-edit-trigger" data-edit-section="section-12" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Best Practices for Supply Chain Excellence
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mt-6">
                <h3 className="text-lg font-bold text-[#252728] mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  Key Takeaways
                </h3>
                <ol className="space-y-4">
                  {[
                    { title: 'Invest in AI-powered demand forecasting', desc: 'Reduce overstock by 30% and stockouts by 65% with predictive models that learn from historical and real-time data.' },
                    { title: 'Build regional redundancy', desc: 'Diversify supplier bases across 3-4 geographies to insulate against tariff shocks and geopolitical disruptions.' },
                    { title: 'Automate warehouses strategically', desc: 'Focus automation on high-volume repetitive tasks first. Expect 2-3 year ROI with 25-40% labor cost savings.' },
                    { title: 'Pursue end-to-end visibility', desc: 'Connect IoT, ERP, and TMS systems into a unified data layer. Only 6% of businesses have achieved this — it is a massive competitive advantage.' },
                    { title: 'Electrify the fleet', desc: 'Start with urban last-mile routes where EV economics are strongest. 40% of executives already prioritize electrification.' },
                    { title: 'Adopt a control tower model', desc: 'Centralize decision-making with AI-powered control towers that provide real-time visibility and autonomous exception handling.' },
                    { title: 'Upskill your workforce', desc: 'Train teams to collaborate with AI and automation systems. The future workforce manages technology, not pallets.' },
                    { title: 'Measure and report sustainability', desc: 'Track carbon footprint across all scopes. Sustainable logistics delivers 15-20% ROI and increasingly drives customer preference.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-red-700 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <div>
                        <strong className="text-[#252728]">{item.title}</strong>
                        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ═══════ SECTION 13: FUTURE OUTLOOK ═══════ */}
            <section
              id="section-13"
              className="article-section mb-16"
              data-section-id="section-13"
              data-section-type="editorial"
              data-section-role="forward-looking"
              data-section-heading="The Future Outlook"
              data-section-purpose="Present expert predictions and industry trajectory for 2027-2030"
            >
              <button className="section-edit-trigger" data-edit-section="section-13" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                The Future Outlook
              </h2>
              {/* IMAGE PLACEHOLDER: Futuristic autonomous logistics, drones, 4:3 */}
              <div className="my-8 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-400 px-8">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
                  <p className="text-sm font-medium">The Future of Autonomous Logistics</p>
                </div>
              </div>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  The trajectory of supply chain logistics points toward a future of increasingly autonomous, sustainable, and resilient operations. By 2030, the industry will look fundamentally different from today.
                </p>
                <p>
                  Agentic AI will move from resolving disruptions to <strong>preventing them entirely</strong> — predicting port congestion weeks in advance, automatically diversifying supplier networks before tariff changes take effect, and orchestrating multi-modal transportation networks in real time.
                </p>
                <p>
                  The regionalization trend will accelerate, with <strong>nearshoring and friendshoring</strong> becoming standard strategies. Companies will maintain smaller, distributed inventory networks rather than centralized mega-warehouses — sacrificing some cost efficiency for resilience and speed.
                </p>
              </div>
              {/* Pull Quote */}
              <blockquote className="border-l-4 border-red-700 bg-gray-50 rounded-r-2xl p-6 my-8">
                <p className="text-lg font-medium text-[#252728] italic leading-relaxed">
                  &ldquo;By 2031, 60% of supply chain disruptions will be resolved entirely without human intervention. The question is not whether AI will run your supply chain — it is whether you will be ready when it does.&rdquo;
                </p>
                <cite className="text-sm text-gray-500 mt-3 block not-italic">— Gartner Supply Chain Research, 2026</cite>
              </blockquote>
              <div className="prose-article space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Sustainability will transition from a competitive advantage to a <strong>license to operate</strong>. Regulations like the EU's Digital Product Passport and carbon border adjustment mechanisms will require full supply chain transparency, making carbon tracking as standard as financial accounting.
                </p>
                <p>
                  For logistics companies and their customers, the message is clear: the organizations that invest now in AI, automation, sustainability, and resilience will not just survive the next disruption — they will turn it into a competitive advantage.
                </p>
              </div>
            </section>

            {/* ═══════ SECTION 14: FAQ ═══════ */}
            <section
              id="section-14"
              className="article-section mb-16"
              data-section-id="section-14"
              data-section-type="faq"
              data-section-role="seo-support"
              data-section-heading="Frequently Asked Questions"
              data-section-purpose="Address common questions for SEO rich snippets"
            >
              <button className="section-edit-trigger" data-edit-section="section-14" onClick={(e) => openEditOverlay(e.currentTarget.closest('.article-section'))} aria-label="Edit section">Edit</button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252728] mb-2 pb-3 border-b-2 border-red-700">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-3">
                {faqItems.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === `f${i}` ? null : `f${i}`)}
                      className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#252728] pr-4">{item.q}</span>
                      <svg className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${faqOpen === `f${i}` ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    {faqOpen === `f${i}` && (
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════ TRUST LAYER: SOURCES ═══════ */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-12">
              <h3 className="text-sm font-bold text-[#252728] uppercase tracking-wider mb-3">Sources & References</h3>
              <p className="text-xs text-gray-500 mb-3">This article cites data from the following research organizations (2025-2026):</p>
              <div className="flex flex-wrap gap-2">
                {['Gartner', 'Prologis', 'Precedence Research', 'McKinsey', 'Agistix', 'Cleo'].map((source) => (
                  <span key={source} className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">{source}</span>
                ))}
              </div>
            </div>

            {/* ═══════ CTA ═══════ */}
            <div className="bg-[#252728] rounded-2xl p-8 md:p-10 text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Need Expert Supply Chain Solutions?</h3>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
                World Pac Logistics provides end-to-end freight forwarding, warehousing, and distribution services powered by modern technology and decades of expertise.
              </p>
              <Link
                href="/contact-us"
                className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider text-sm shadow-lg hover:scale-105 transition-all"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>

          {/* ─── SIDEBAR TOC (Desktop) ─── */}
          <aside ref={sidebarRef} className="hidden lg:block">
            <div className="sticky top-24">
              <nav className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-[#252728] uppercase tracking-widest mb-4">In This Article</h4>
                <ul className="space-y-1">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block py-1.5 px-3 text-sm rounded-lg transition-all ${
                          activeTocId === item.id
                            ? 'bg-red-700 text-white font-medium'
                            : 'text-gray-600 hover:text-red-700 hover:bg-white'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Share */}
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-[#252728] uppercase tracking-widest mb-3">Share</h4>
                <div className="flex gap-2">
                  {[
                    { label: 'LinkedIn', icon: <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /> },
                    { label: 'X', icon: <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.16 12.16 0 013.16 4.86a4.28 4.28 0 001.33 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.27 4.27 0 01-1.93.07 4.29 4.29 0 004 2.98A8.59 8.59 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.55a8.51 8.51 0 01-2.54.7z" /> },
                    { label: 'Email', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
                  ].map((social, i) => (
                    <button
                      key={social.label}
                      aria-label={`Share on ${social.label}`}
                      className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-200 hover:text-red-700 transition-colors text-gray-500"
                    >
                      <svg className="w-4 h-4" fill={i < 2 ? 'currentColor' : 'none'} stroke={i >= 2 ? 'currentColor' : 'none'} viewBox="0 0 24 24">{social.icon}</svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══════ SECTION EDIT OVERLAY ═══════ */}
      {editOverlayOpen && (
        <div className="section-edit-overlay fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4" id="section-edit-overlay">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#252728]">Edit Section</h3>
              <button onClick={() => setEditOverlayOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            {editTarget && (
              <>
                <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm">
                  <p className="text-gray-500">Section: <strong className="text-[#252728]">{editTarget.heading}</strong></p>
                  <p className="text-gray-400 text-xs mt-1">ID: {editTarget.id} | Type: {editTarget.type} | Role: {editTarget.role}</p>
                </div>
                <textarea
                  value={editInstruction}
                  onChange={(e) => setEditInstruction(e.target.value)}
                  placeholder="Describe what you want to change..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-28 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-colors"
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setEditOverlayOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleApplyEdit} className="flex-1 py-2.5 bg-red-700 text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-colors">
                    Apply Edit
                  </button>
                </div>
                {editStatus?.type === 'success' && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">{editStatus.message}</div>
                )}
                {editStatus?.type === 'fallback' && (
                  <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-sm text-yellow-700 mb-2">Clipboard unavailable. Copy the prompt below manually:</p>
                    <pre className="text-xs bg-white border border-yellow-200 rounded-lg p-2 overflow-auto max-h-32 whitespace-pre-wrap">{editStatus.prompt}</pre>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════ EDIT TRIGGER STYLES ═══════ */}
      <style jsx global>{`
        .section-edit-trigger {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 40;
          opacity: 0;
          pointer-events: none;
          background: #252728;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .article-section {
          position: relative;
        }
        .article-section:hover .section-edit-trigger {
          opacity: 1;
          pointer-events: auto;
        }
        .section-edit-trigger:hover {
          background: #b91c1c;
          transform: scale(1.05);
        }
        @media print {
          .section-edit-trigger,
          .section-edit-overlay {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
