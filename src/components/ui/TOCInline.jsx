'use client';

import { useState } from 'react';

export default function TOCInline({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-8 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 text-sm font-semibold text-gray-900"
      >
        Table of Contents
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="px-5 py-3 space-y-2">
          {items.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block text-sm text-gray-600 hover:text-red-700"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
