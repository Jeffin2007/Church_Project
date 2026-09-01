'use client';
/**
 * SafeImage
 * ─────────
 * Wraps next/image with:
 *   1. Blur-up placeholder — shows a tiny inline base64 shimmer while loading,
 *      then cross-dissolves to the real image (smooth, no jarring pop-in).
 *   2. Error fallback — when an image is missing (404), renders a sacred-styled
 *      placeholder with a cross icon instead of a broken image.
 *
 * Usage:
 *   <SafeImage src="/images/hero/church-altar.webp" alt="..." fill />
 *   <SafeImage src="..." alt="..." width={800} height={600} blur />
 *
 * Props are identical to next/image; SafeImage adds:
 *   placeholderLabel?      Short label inside the error fallback.
 *   placeholderClassName?  Tailwind classes for the error fallback container.
 *   blur?                  Set false to skip the shimmer (default: true).
 */

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { Cross } from 'lucide-react';

// ── Tiny sacred-blue shimmer encoded as base64 SVG ───────────────────────────
// 4×3 pixel SVG with a soft gradient — used as blurDataURL placeholder.
// Chosen to match the Marian-blue palette so the reveal feels cohesive.
// Pre-encoded at author time (no Node Buffer dependency in the browser).
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMjNCNkQiIHN0b3Atb3BhY2l0eT0iMC4xNSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZBRjdGMCIgc3RvcC1vcGFjaXR5PSIwLjA4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMyIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';

interface SafeImageProps extends ImageProps {
  placeholderLabel?: string;
  placeholderClassName?: string;
  /** Set false to disable blur-up. Default: true */
  blur?: boolean;
}

export function SafeImage({
  src,
  alt,
  placeholderLabel,
  placeholderClassName = '',
  className = '',
  blur = true,
  quality = 80,
  priority = false,
  loading,
  ...props
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  // ── Error fallback ────────────────────────────────────────────────────────
  if (errored) {
    const isFill = typeof props.fill === 'boolean' && props.fill;
    return (
      <div
        className={`bg-primary/[0.06] flex flex-col items-center justify-center gap-2 ${
          placeholderClassName || (isFill ? 'absolute inset-0' : 'h-full w-full')
        }`}
        aria-label={typeof alt === 'string' ? alt : undefined}
        role="img"
      >
        <Cross className="text-primary/25 h-10 w-10" aria-hidden="true" />
        {(placeholderLabel ?? alt) && (
          <p className="text-muted-foreground/50 px-4 text-center text-xs font-medium">
            {placeholderLabel ?? (typeof alt === 'string' ? alt : '')}
          </p>
        )}
      </div>
    );
  }

  // ── Blur-up placeholder ───────────────────────────────────────────────────
  // Only apply when the consumer hasn't already set a placeholder / blurDataURL.
  const blurProps: Partial<ImageProps> =
    blur && !props.blurDataURL && props.placeholder !== 'empty'
      ? { placeholder: 'blur', blurDataURL: BLUR_DATA_URL }
      : {};

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      quality={quality}
      priority={priority}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      onError={() => setErrored(true)}
      {...blurProps}
      {...props}
    />
  );
}
