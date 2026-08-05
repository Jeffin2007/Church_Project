'use client';

/**
 * Prayerful Micro-Interaction Components
 *
 * BreathingCross   — a cross that gently pulses with life
 * CandleFlame      — an animated candle with a golden glow ring
 * PageTransition   — wraps page content in a soft fade-in
 */

import React, { type ReactNode } from 'react';
import { Cross } from 'lucide-react';

// ─── Breathing Cross ─────────────────────────────────────────────────────────

interface BreathingCrossProps {
  /** Diameter of the circular background. Default: 48px */
  size?: number;
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export function BreathingCross({
  size = 48,
  className = '',
  'aria-label': ariaLabel = 'Sacred cross',
}: BreathingCrossProps) {
  const iconSize = Math.round(size * 0.5);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`bg-primary cross-breathe inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Cross
        style={{ width: iconSize, height: iconSize }}
        className="text-white"
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Candle Flame ─────────────────────────────────────────────────────────────

interface CandleProps {
  /** Height of the candle body in px. Default: 64 */
  candleHeight?: number;
  className?: string;
  'aria-label'?: string;
}

export function Candle({
  candleHeight = 64,
  className = '',
  'aria-label': ariaLabel = 'Lit candle',
}: CandleProps) {
  const candleWidth = Math.round(candleHeight * 0.28);
  const flameH = Math.round(candleHeight * 0.45);
  const flameW = Math.round(flameH * 0.65);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`relative inline-flex flex-col items-center ${className}`}
    >
      {/* Glow ring behind flame */}
      <div
        className="candle-glow-ring absolute rounded-full"
        style={{
          width: flameW * 2.2,
          height: flameW * 2.2,
          top: -(flameW * 0.6),
          background: 'radial-gradient(circle, rgba(201,162,39,0.40) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Flame */}
      <div
        className="candle-flame z-10"
        aria-hidden="true"
        style={{
          width: flameW,
          height: flameH,
          background: 'linear-gradient(to top, #C9A227 0%, #F5C842 40%, #FFF4B8 100%)',
          boxShadow: '0 0 10px 4px rgba(201,162,39,0.45)',
          marginBottom: -2,
        }}
      />

      {/* Wick */}
      <div
        className="z-20 rounded-full bg-gray-700"
        aria-hidden="true"
        style={{ width: 2, height: 6, marginBottom: -2 }}
      />

      {/* Candle body */}
      <div
        className="z-10 rounded-sm"
        aria-hidden="true"
        style={{
          width: candleWidth,
          height: candleHeight,
          background: 'linear-gradient(to right, #FAF7F0 0%, #FFFFFF 40%, #F0E9DA 100%)',
          boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.08)',
          border: '1px solid rgba(201,162,39,0.25)',
        }}
      />
    </div>
  );
}

// ─── Page Transition ──────────────────────────────────────────────────────────

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps any page content in a gentle fade-in + rise animation.
 * Use at the <main> level. Respects prefers-reduced-motion via CSS.
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return <div className={`page-enter ${className}`}>{children}</div>;
}
