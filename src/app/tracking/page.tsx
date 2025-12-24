'use client';

import { useEffect } from 'react';
import { Header, MobileBottomNav } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import {
  WelcomeSection,
  SymptomChips,
  FlowIntensitySlider,
  NotesSection,
} from '@/components/tracking';
import { useTrackingStore } from '@/store/trackingStore';
import {
  PHYSICAL_PAIN_SYMPTOMS,
  MOOD_MENTAL_SYMPTOMS,
  PERIOD_INDICATORS,
  SEXUAL_HEALTH_SYMPTOMS,
} from '@/lib/constants';
import { format } from 'date-fns';

export default function TrackingPage() {
  const {
    formData,
    isLoading,
    isSaving,
    updateFormField,
    saveDayLog,
    fetchDayLog,
  } = useTrackingStore();

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    fetchDayLog(today);
  }, [fetchDayLog, today]);

  const handleSave = async () => {
    await saveDayLog(today);
    alert('Symptoms logged successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Column */}
          <div className="space-y-4 lg:space-y-6">
            <WelcomeSection />

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Period Indicators</h3>
              <SymptomChips
                title=""
                options={PERIOD_INDICATORS}
                selectedValues={formData.periodIndicators}
                onChange={(values) => updateFormField('periodIndicators', values)}
              />
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Sexual Health</h3>
              <SymptomChips
                title=""
                options={SEXUAL_HEALTH_SYMPTOMS}
                selectedValues={formData.sexualHealth}
                onChange={(values) => updateFormField('sexualHealth', values)}
              />
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 lg:space-y-6">
            <Card>
              <SymptomChips
                title="Physical Pain"
                options={PHYSICAL_PAIN_SYMPTOMS}
                selectedValues={formData.physicalPain}
                onChange={(values) => updateFormField('physicalPain', values)}
              />
            </Card>

            <Card>
              <SymptomChips
                title="Mood & Mental"
                options={MOOD_MENTAL_SYMPTOMS}
                selectedValues={formData.moodMental}
                onChange={(values) => updateFormField('moodMental', values)}
              />
            </Card>

            <Card>
              <FlowIntensitySlider
                value={formData.flowIntensity}
                onChange={(value) => updateFormField('flowIntensity', value)}
              />
            </Card>

            <Card>
              <NotesSection
                value={formData.notes}
                onChange={(value) => updateFormField('notes', value)}
              />
            </Card>

            <Button
              className="w-full py-4 text-lg font-medium"
              size="lg"
              onClick={handleSave}
              isLoading={isSaving}
            >
              Save
              <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
