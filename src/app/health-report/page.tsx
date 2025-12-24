'use client';

import { Header, MobileBottomNav } from '@/components/layout';
import {
  CycleSummary,
  FlowSymptomSummary,
  PeriodLengthChart,
  SymptomFrequencyCharts,
  HistoricalDataTable,
} from '@/components/health-report';

export default function HealthReportPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
          <CycleSummary />
          <FlowSymptomSummary />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
          <PeriodLengthChart />
          <SymptomFrequencyCharts />
        </div>

        {/* Bottom Section */}
        <HistoricalDataTable />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
