'use client';

import React from 'react';
import { SafeImage } from './safe-image';

export interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'arch' | 'wide';
  arch?: boolean;
  frame?: boolean;
  caption?: string;
  className?: string;
  priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  arch = false,
  frame = true,
  caption,
  className = '',
  priority = false,
}) => {
  const aspectClasses = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    arch: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
  };

  const archClasses = arch
    ? 'rounded-t-[3rem] sm:rounded-t-[4.5rem] rounded-b-xl'
    : 'rounded-2xl';

  return (
    <figure className={`group relative flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden ${aspectClasses[aspectRatio]} ${archClasses} ${
          frame
            ? 'border-2 border-gold/30 bg-muted/40 shadow-lg dark:border-gold/20 dark:shadow-2xl'
            : ''
        }`}
      >
        <SafeImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Soft liturgical vignette gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground sm:text-sm font-serif italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
