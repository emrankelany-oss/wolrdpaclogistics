'use client';

import { useState, useEffect } from 'react';

export default function TOCSidebar({ items }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="hidden lg:block sticky top-24 self-start w-56 shrink-0">
      <nav className="border-l border-gray-200 pl-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">On this page</p>
        <ul className="space-y-2">
          {items.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-xs leading-snug transition-colors duration-200 ${
                  activeId === id ? 'text-red-700 font-semibold' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
