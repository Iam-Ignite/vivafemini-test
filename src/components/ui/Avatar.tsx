'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt = 'Avatar', fallback, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  // Use profile image from design as default
  const defaultSrc = '/Image/profile.png';
  const imageSrc = src || defaultSrc;

  if (!src && !defaultSrc) {
    return (
      <div
        className={cn(
          'rounded-full bg-primary-light flex items-center justify-center text-primary font-semibold',
          sizes[size],
          className
        )}
      >
        {fallback?.charAt(0).toUpperCase() || '?'}
      </div>
    );
  }

  return (
    <div className={cn('relative rounded-full overflow-hidden', sizes[size], className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
