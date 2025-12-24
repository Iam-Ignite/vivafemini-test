'use client';

import { Card } from '@/components/ui';
import Image from 'next/image';

export function WelcomeSection() {
  return (
    <Card className="text-center py-8">
      {/* Illustration with phone, calendar, pills, floral elements */}
      <div className="w-64 h-48 mx-auto mb-6 relative">
          <Image src="/icons/OBJECTS.svg" alt="Welcome Illustration" fill className="object-contain"/>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome,</h2>
      <p className="text-primary font-medium mb-2">How are you doing today?</p>
      <p className="text-sm text-gray-500 max-w-xs mx-auto">
        Get to track your symptoms daily, to know your state of wellbeing
      </p>
    </Card>
  );
}
