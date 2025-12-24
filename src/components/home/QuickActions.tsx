'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui';

const actions = [
  {
    href: '/tracking',
    label: 'Log symptoms',
    icon: '/icons/quick-action-1-pajamas_status-health.png',
  },
  {
    href: '/tracking',
    label: 'Log period',
    icon: '/icons/quick-action-4-hugeicons_blood (1).png',
  },
  {
    href: '/health-report',
    label: 'Health Report',
    icon: '/icons/quick-ation-3gravity-ui_stethoscope.png',
  },
];

export function QuickActions() {
  return (
    <Card>
      <h3 className="text-primary font-semibold mb-4">Quick Action</h3>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-primary hover:bg-pink-50 transition-all"
          >
            <span className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center">
              <Image
                src={action.icon}
                alt={action.label}
                width={18}
                height={18}
                className="object-contain"
                unoptimized
              />
            </span>
            <span className="text-sm text-gray-700 font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
