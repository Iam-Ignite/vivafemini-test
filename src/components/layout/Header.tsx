'use client';

import { Avatar } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { getGreeting } from '@/lib/utils';
import { useEffect } from 'react';
import { NavigationTabs } from './NavigationTabs';

export function Header() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* User greeting */}
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.avatarUrl}
              alt={user?.firstName || 'User'}
              fallback={user?.firstName}
              size="md"
            />
            <div>
              <p className="text-sm text-gray-400">
                {getGreeting()} <span className="text-yellow-400">👋</span>
              </p>
              <p className="font-semibold text-gray-900">
                {user?.firstName || 'User'}
              </p>
            </div>
          </div>

          {/* Navigation - Desktop only */}
          <div className="hidden lg:block">
            <NavigationTabs />
          </div>

          {/* Mobile icons */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Notification bell */}
            <button className="relative w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                54
              </span>
            </button>
            {/* Settings gear */}
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>

          {/* Empty div for balance - Desktop only */}
          <div className="w-32 hidden lg:block" />
        </div>
      </div>
    </header>
  );
}
