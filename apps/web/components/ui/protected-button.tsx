'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProtectedButtonProps {
  targetUrl: string;
  children: React.ReactNode;
  className?: string;
  isLoggedIn?: boolean;
}

export function ProtectedButton({
  targetUrl,
  children,
  className = '',
  isLoggedIn = false,
}: ProtectedButtonProps) {
  const router = useRouter();

  const redirectUrl = `/login?redirect=${encodeURIComponent(targetUrl)}`;

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push(redirectUrl);
    }
  };

  return (
    <Link href={isLoggedIn ? targetUrl : redirectUrl} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
