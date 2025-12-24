'use client';

import { Card } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';

export function ReferralBanner() {
  const { user, dismissCard } = useUserStore();

  // Only hide if user is loaded and has explicitly dismissed this card
  const isDismissed = user && user.dismissedCards && user.dismissedCards.includes('referral');

  if (isDismissed) {
    return null;
  }

  return (
    <Card className="relative bg-gradient-to-r from-pink-50 to-white">
      <button
        onClick={() => dismissCard('referral')}
        className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 text-xs"
      >
        x
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Refer your friends to VivaFemini <span className="text-pink-500">💕</span><span className="text-yellow-500">🎉</span>
          </h3>
          <p className="text-sm text-gray-500">
            Gift your friend 30 days of free Premium to help them thrive
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <Image
            src="/Image/announcement-megaphone-remix.png"
            alt="Announcement"
            width={48}
            height={48}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </Card>
  );
}
