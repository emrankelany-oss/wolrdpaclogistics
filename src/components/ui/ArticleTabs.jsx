'use client';

import { useState } from 'react';

export default function ArticleTabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              i === activeIndex
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeIndex]?.content}</div>
    </div>
  );
}
