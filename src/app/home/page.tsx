'use client';

import { useEffect } from 'react';
import { Header, MobileBottomNav } from '@/components/layout';
import {
  CalendarWidget,
  CycleHighlight,
  DailyCheckOffs,
  TrendWatch,
  QuickActions,
  ReferralBanner,
  PregnancyTestCard,
  RecommendedArticles,
} from '@/components/home';
import { useCycleStore } from '@/store/cycleStore';

export default function HomePage() {
  const { currentCycle, predictions, fetchCurrentCycle } = useCycleStore();

  useEffect(() => {
    fetchCurrentCycle();
  }, [fetchCurrentCycle]);

  const cycleStartDate = currentCycle?.startDate
    ? new Date(currentCycle.startDate)
    : undefined;

  const nextPeriodDate = predictions?.nextPeriodDate
    ? new Date(predictions.nextPeriodDate)
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Column - Calendar and actions */}
          <div className="space-y-4 lg:space-y-6">
            {/* Calendar with Cycle Day */}
            <CalendarWidget
              cycleStartDate={cycleStartDate}
              periodLength={currentCycle?.periodLength || 5}
              predictedPeriodStart={nextPeriodDate}
              avgCycleLength={predictions?.avgCycleLength || 28}
              cycleProgress={predictions?.cycleProgress || 78}
              nextPeriodDate={predictions?.nextPeriodDate}
              daysUntilPeriod={predictions?.daysUntilPeriod || 17}
              fertileWindowStart={predictions?.fertileWindow?.start}
            />

            <ReferralBanner />
            <PregnancyTestCard />
            <QuickActions />
          </div>

          {/* Right Column - Cycle info and articles */}
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-[#F3F4F6] p-2 rounded-xl">
            <CycleHighlight cycleDay={predictions?.currentCycleDay || 1} />

            {/* Daily Check-Offs and Trend Watch - stack on mobile */}
            <div className="space-y-4 mt-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
              <DailyCheckOffs />
              <TrendWatch />
            </div>

            </div>

            <RecommendedArticles />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
