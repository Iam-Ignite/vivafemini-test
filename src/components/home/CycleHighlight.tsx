'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { tipsService } from '@/services/api';
import { Tip } from '@/types';

interface CycleHighlightProps {
  cycleDay: number;
}

export function CycleHighlight({ cycleDay }: CycleHighlightProps) {
  const [tips, setTips] = useState<Tip[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await tipsService.getByCycleDay(cycleDay);
        if (response.data.length > 0) {
          setTips(response.data);
        } else {
          // Fallback tips matching design
          setTips([
            {
              _id: '1',
              title: 'Drink Enough Water',
              content: 'Stay hydrated! Drink enough water to support your health and your body.',
              icon: '💧',
              cycleDays: [],
              category: 'hydration',
              actionText: '6-8 glasses daily',
            },
            {
              _id: '2',
              title: 'Stay Comfortable',
              content: 'On heavy flow days, prioritize comfort. Stay hydrated and use heating pads for abdominal relief.',
              icon: '🥗',
              cycleDays: [],
              category: 'comfort',
              actionText: 'Listen to your body',
            },
            {
              _id: '3',
              title: 'Gentle Movement',
              content: 'Light stretches and gentle yoga can help ease discomfort.',
              icon: '🧘‍♀️',
              cycleDays: [],
              category: 'exercise',
              actionText: 'Listen to your body',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch tips:', error);
      }
    };
    fetchTips();
  }, [cycleDay]);

  const cardColors = [
    'bg-cyan-50 border-cyan-100',
    'bg-pink-100 border-pink-200',
    'bg-orange-50 border-orange-100',
  ];

  const currentTip = tips[currentTipIndex];

  return (
    <Card className="h-auto">
      <h3 className="text-primary font-semibold text-lg text-center mb-1">
        Cycle Highlight
      </h3>
      <p className="text-gray-500 text-sm text-center mb-4">
        Understand your cycle and take care during peak days
      </p>

      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 border border-pink-200 text-primary text-sm font-medium rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Day {cycleDay} Tip
        </span>
      </div>

      {/* Mobile: Single card with dots */}
      {currentTip && (
        <div className="lg:hidden">
          <div className={`p-6 rounded-2xl border text-center ${cardColors[currentTipIndex % cardColors.length]}`}>
            <span className="text-5xl block mb-4">{currentTip.icon}</span>
            <h4 className="font-semibold text-gray-900 text-lg mb-2">{currentTip.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{currentTip.content}</p>
            {currentTip.actionText && (
              <p className="text-sm text-gray-700 inline-flex items-center gap-1.5 bg-white/60 rounded-full px-4 py-2">
                <span className="text-pink-400">💜</span> {currentTip.actionText}
              </p>
            )}
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTipIndex ? 'bg-primary w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Desktop: Horizontal scroll carousel */}
      <div className="hidden lg:flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        {tips.map((tip, index) => (
          <div
            key={tip._id}
            className={`flex-shrink-0 w-64 p-5 rounded-2xl border transition-all ${cardColors[index % cardColors.length]}`}
          >
            <span className="text-4xl block mb-3">{tip.icon}</span>
            <h4 className="font-semibold text-gray-900 text-base mb-2">{tip.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-4 mb-3">{tip.content}</p>
            {tip.actionText && (
              <p className="text-sm text-gray-700 flex items-center gap-1.5 bg-white/60 rounded-full px-3 py-1.5 w-fit">
                <span className="text-pink-400">💜</span> {tip.actionText}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
