'use client';
/**
 * CinematicPortrait
 * ─────────────────
 * Loops between the original photograph and the stylised/animated version
 * with a smooth cinematic cross-dissolve + subtle film-grain overlay.
 *
 * Phase timeline (total ≈ 9 s):
 *   0.0 – 2.5 s  original shown (stable)
 *   2.5 – 3.5 s  cross-dissolve to animated
 *   3.5 – 6.0 s  animated shown (stable)
 *   6.0 – 7.0 s  cross-dissolve back to original
 *   7.0 – 9.0 s  original shown → loop
 *
 * prefers-reduced-motion → static original only.
 */

import { SafeImage } from '@/components/ui/safe-image';
import { useEffect, useState, useRef } from 'react';

type Phase = 'original' | 'to-animated' | 'animated' | 'to-original';

const TIMING: Record<Phase, number> = {
  original: 2500,
  'to-animated': 1000,
  animated: 2500,
  'to-original': 1000,
};
const NEXT: Record<Phase, Phase> = {
  original: 'to-animated',
  'to-animated': 'animated',
  animated: 'to-original',
  'to-original': 'original',
};

export function CinematicPortrait() {
  const [phase, setPhase] = useState<Phase>('original');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    timerRef.current = setTimeout(() => setPhase((p) => NEXT[p]), TIMING[phase]);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, reduced]);

  // Opacity of the animated layer
  const animatedOpacity = phase === 'animated' ? 1 : phase === 'to-animated' ? 1 : 0;

  const isTransitioning = phase === 'to-animated' || phase === 'to-original';
  const transitionDuration = isTransitioning ? 'duration-1000' : 'duration-0';

  return (
    <div
      className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl"
      role="img"
      aria-label="Portrait of Jeffin Josva S, developer"
    >
      <SafeImage
        src="/images/Dev/original.jpeg"
        alt="Jeffin Josva S"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 640px) 90vw, 384px"
      />

      {!reduced && (
        <SafeImage
          src="/images/Dev/animated.jpeg"
          alt=""
          aria-hidden={true}
          fill
          className={`object-cover transition-opacity ${transitionDuration}`}
          style={{ opacity: animatedOpacity }}
          sizes="(max-width: 640px) 90vw, 384px"
        />
      )}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.35)' }}
        aria-hidden="true"
      />

      {/* Gold accent border */}
      <div className="ring-gold-500/30 absolute inset-0 rounded-3xl ring-4" aria-hidden="true" />
    </div>
  );
}
